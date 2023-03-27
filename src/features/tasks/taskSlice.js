import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { PRIORITY } from '../../utils/constants';
import sanityClient, {
  SANITY_AUTH_TOKEN,
  SANITY_URL,
} from '../../utils/sanityClient';

export const STATUS = Object.freeze({
  IN_PROGRESS: 'In Progress',
  COMPLETE: 'Complete',
  TO_DO: 'To Do',
});

const initialState = {
  info: [],
  status: {
    fetchTasks: 'idle',
  },
  error: {
    fetchTasks: null,
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const id = `${state.info.length + 1}`;
      state.info.push({ id, ...action.payload, subTasks: [] });
    },
    editTask(state, action) {
      state.info = state.info.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    },
    deleteTask(state, action) {
      return state.filter((task) => task.id !== action.payload);
    },
    reset(state, action) {
      const info = [],
        { status, error } = initialState;
      state.info = info;
      state.status = status;
      state.error = error;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status.fetchTasks = 'pending';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status.fetchTasks = 'succeeded';
        state.info = [...action.payload];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status.fetchTasks = 'failed';
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.status.addTask = 'succeeded';
        state.info = state.info.concat(action.payload);
      })

      .addCase(editTask.fulfilled, (state, action) => {
        state.status.addTask = 'succeeded';
        state.info = state.info.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status.deleteTask = 'succeeded';
        state.info = state.info.filter((task) => task.id !== action.payload);
      });
  },
});

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task, { getState, rejectWithValue }) => {
    const {
      user: {
        info: { _id: userId },
      },
    } = getState();

    const _key = nanoid();

    const createMutations = [
      {
        create: {
          _type: 'task',
          ...task,
          owners: [{ _ref: userId, _type: 'reference', _key }],
        },
      },
    ];

    const response = await axios.post(
      SANITY_URL,
      { mutations: createMutations },
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${SANITY_AUTH_TOKEN}`,
        },
      }
    );

    const newTaskId = response?.data?.results?.[0]?.id;
    if (newTaskId) {
      const newTask = await sanityClient.fetch(
        `*[_type == "task" && _id == $newTaskId][0]`,
        { newTaskId }
      );

      return refactorfetchedTasks([newTask]);
    } else return rejectWithValue('Sign Up failed!');
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (task, { getState, rejectWithValue }) => {
    const { id, name, description, startDate, endDate, reminder, priority } =
      task;
    try {
      await axios.post(
        SANITY_URL,
        {
          mutations: [
            {
              patch: {
                id,
                set: {
                  name,
                  description,
                  startDate,
                  endDate,
                  reminder,
                  priority,
                },
              },
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${SANITY_AUTH_TOKEN}`,
          },
        }
      );

      return task;
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await axios.post(
        SANITY_URL,
        {
          mutations: [
            {
              delete: {
                id: taskId,
              },
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${SANITY_AUTH_TOKEN}`,
          },
        }
      );

      return taskId;
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    const { _id: userId } = getState().user.info;

    try {
      const { tasks } = await sanityClient.fetch(
        `*[_type == "user" && _id == $userId][0]{
        "tasks" : *[_type == "task" && references(^._id)]{
          ...,
          assignees[]->{_id, name, email,userAvatar},
            owners[]->{_id, name, email,userAvatar},
            team->{_id}
        }
      }`,
        {
          userId,
        }
      );

      const { teams } = await sanityClient.fetch(
        ` *[_type == "user" && _id == $userId][0]{
        "teams" : *[_type == "team" && references(^._id)]{
         "tasks" : *[_type == "task" && references(^._id)]{
          ...,
          assignees[]->{_id, name, email,userAvatar},
            owners[]->{_id, name, email,userAvatar},
            team->{_id}
        }
        }
        }`,
        { userId }
      );

      const teamTasks = teams.filter((team) => team.tasks.length !== 0);

      let result = [];
      teamTasks.forEach((item) => {
        const myTasks = item.tasks.map((task) => ({
          ...task,
          type: 'team',
        }));
        result = [...result, ...myTasks];
      });

      return refactorfetchedTasks(
        tasks
          .filter((task) => !result.find((item) => task._id === item._id))
          .concat(result)
      );
    } catch (err) {
      console.log(err);
    }
  }
);

const refactorfetchedTasks = (tasks) => {
  const setResult = (task) => {
    return {
      id: task._id,
      name: task.name,
      description: task?.description ?? '',
      startDate: task?.startDate ?? null,
      endDate: task?.endDate ?? null,
      reminder: task?.reminder ?? false,
      isComplete: task?.isComplete ?? false,
      priority: task?.priority ?? PRIORITY.LOW,
      createdAt: task._createdAt,
      updatedAt: task._updatedAt,
    };
  };

  return tasks.map((task) => {
    return {
      ...setResult(task),
      teamId: task?.team?._id ?? null,
      subTasks: (task?.subTasks ?? []).map((subTask) => setResult(subTask)),
      owners: task?.owners ?? [],
      assignees: task?.assignees ?? [],
      followers: task?.followers ?? [],
      type: !Boolean(task?.type) ? 'self' : task.type,
    };
  });
};

export const selectAllTasks = (state) => state.tasks.info;
export const selectLatestTask = (state) =>
  state.tasks.info[state.tasks.info.length - 1];
export const selectTaskById = (state, id) => {
  return state.tasks.info.find((task) => task.id === id);
};

export const selectTasksByStatus = (state) => {
  const tasks = [...selectAllTasks(state)].reverse();

  const isTaskComplete = (task) => {
    const subTasks = task.subTasks;
    const zeroSubTasks = subTasks.length === 0;
    return zeroSubTasks
      ? zeroSubTasks && task.isComplete
      : subTasks.every((subTask) => subTask.isComplete);
  };

  return {
    previousWork: tasks.filter((task) => isTaskComplete(task)),
    toDoTasks: tasks.filter((task) => !isTaskComplete(task)),
  };
};

export const selectSubTaskById = (state, taskId, subTaskId) => {
  const task = selectTaskById(state, taskId);
  return task ? task.subTasks.find((subTask) => subTask.id === subTaskId) : {};
};

export const selectOneTask = (state, taskId) => {
  const selectTask = selectTaskById(state, taskId);

  let toDo = [],
    complete = [],
    completeSubTasks = 0,
    totalSubTasks = 0;

  if (selectTask?.subTasks) {
    toDo = selectTask.subTasks.filter((subTask) => !subTask.isComplete);
    complete = selectTask.subTasks.filter((subTask) => subTask.isComplete);

    completeSubTasks = complete.length;
    totalSubTasks = selectTask.subTasks.length;
  }

  return {
    selectTask,
    subTasks: { toDo, complete },
    completeSubTasks,
    totalSubTasks,
  };
};

export const selectTasksByTeam = (state, teamId) =>
  state.tasks.info.filter((task) => task.teamId === teamId);

export const selectTeamTasks = (state) => {
  const {
    tasks: { info },
  } = state;
  return info.filter((task) => task.type === 'team');
};

export default tasksSlice.reducer;
