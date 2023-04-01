import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';
import { PRIORITY } from '../../utils/constants';
import sanityClient, { sanityPost } from '../../utils/sanityClient';
import subTasks from './SubTasks';

export const STATUS = Object.freeze({
  IN_PROGRESS: 'In Progress',
  COMPLETE: 'Complete',
  TO_DO: 'To Do',
});

const initialState = {
  info: [],
  status: {
    fetchTasks: 'idle',
    addTask: 'idle',
    editTask: 'idle',
    deleteTask: 'idle',
    addSubTask: 'idle',
    editSubTask: 'idle',
  },
  error: {
    fetchTasks: null,
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
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

      .addCase(addTask.pending, (state, action) => {
        state.status.addTask = 'pending';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status.addTask = 'succeeded';
        state.info = state.info.concat(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status.addTask = 'failed';
        state.error.addTask = action.payload;
      })

      .addCase(editTask.pending, (state, action) => {
        state.status.editTask = 'pending';
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const { taskId, values } = action.payload;
        state.info = state.info.map((task) =>
          task.id === taskId ? { ...task, ...values } : task
        );
        state.status.editTask = 'succeeded';
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status.editTask = 'failed';
        state.error.editTask = action.payload;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status.deleteTask = 'succeeded';
        state.info = state.info.filter((task) => task.id !== action.payload);
      })

      .addCase(addSubTask.pending, (state, action) => {
        state.status.addSubTask = 'pending';
      })
      .addCase(addSubTask.fulfilled, (state, action) => {
        const { taskId, newSubTask } = action.payload;
        state.info = state.info.map((task) =>
          task.id === taskId
            ? { ...task, subTasks: [...task.subTasks, newSubTask] }
            : task
        );
        state.status.addSubTask = 'succeeded';
      })
      .addCase(addSubTask.rejected, (state, action) => {
        state.status.addSubTask = 'failed';
        state.error.addTask = action.payload;
      })

      .addCase(editSubTask.pending, (state, action) => {
        state.status.editSubTask = 'pending';
      })
      .addCase(editSubTask.fulfilled, (state, action) => {
        const { taskId, subTaskId, values } = action.payload;
        state.info = state.info.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subTasks: task.subTasks.map((subTask) =>
                  subTask.id === subTaskId ? { ...subTask, ...values } : subTask
                ),
              }
            : task
        );
        state.status.editSubTask = 'succeeded';
      })
      .addCase(editSubTask.rejected, (state, action) => {
        state.status.editSubTask = 'failed';
        state.error.editSubTask = action.payload;
      })

      .addCase(deleteSubTask.fulfilled, (state, action) => {
        const { taskId, subTaskId } = action.payload;
        state.info = state.info.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subTasks: task.subTasks.filter(
                  (subTask) => subTask.id !== subTaskId
                ),
              }
            : task
        );
        state.status.deleteTask = 'succeeded';
      });
  },
});

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task, { getState, rejectWithValue }) => {
    const createMutations = [
      {
        create: {
          _type: 'task',
          ...task,
          owners: [
            {
              _ref: getState().user.info._id,
              _type: 'reference',
              _key: nanoid(),
            },
          ],
        },
      },
    ];

    const response = await sanityPost(createMutations);

    const newTaskId = response?.data?.results?.[0]?.id;

    if (newTaskId) {
      const newTask = await sanityClient.fetch(
        `*[_type == "task" && _id == $newTaskId][0]`,
        {
          newTaskId,
        }
      );

      return refactorfetchedTasks([newTask]);
    } else return rejectWithValue('Operation failed!');
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async ({ taskId, values }, { getState, rejectWithValue }) => {
    try {
      await sanityPost([
        {
          patch: {
            id: taskId,
            set: {
              ...values,
            },
          },
        },
      ]);

      return { taskId, values };
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { getState, rejectWithValue }) => {
    const {
      tasks: { info },
    } = getState();
    const subTasks = (info.find((item) => item.id === taskId) ?? [])?.subTasks;

    const subTaskDeleteMutations = subTasks.map((subTask) => ({
      delete: {
        id: subTask.id,
      },
    }));

    try {
      await sanityPost([
        {
          delete: {
            id: taskId,
          },
        },
        ...subTaskDeleteMutations,
      ]);

      return taskId;
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const addSubTask = createAsyncThunk(
  'tasks/addSubTask',
  async ({ taskId, newSubTask }, { getState, rejectWithValue }) => {
    const refs = await getRefs(taskId);

    try {
      const { data } = await sanityPost([
        {
          create: {
            _type: 'subTask',
            ...newSubTask,
          },
        },
      ]);

      const { id } = data?.results?.[0];
      if (id) {
        await sanityPost([
          {
            patch: {
              id: taskId,
              set: {
                subTasks: [
                  ...(refs?.subTasks ?? []),
                  { _key: nanoid(), _ref: id, _type: 'reference' },
                ],
              },
            },
          },
        ]);

        return { taskId, newSubTask: { id, ...newSubTask } };
      } else rejectWithValue('Add Subtask failed');
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const editSubTask = createAsyncThunk(
  'tasks/editSubTask',
  async ({ taskId, subTaskId, values }, { getState, rejectWithValue }) => {
    try {
      await sanityPost([
        {
          patch: {
            id: subTaskId,
            set: {
              ...values,
            },
          },
        },
      ]);
      return { taskId, subTaskId, values };
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const deleteSubTask = createAsyncThunk(
  'tasks/deleteSubTask',
  async ({ taskId, subTaskId }, { getState, rejectWithValue }) => {
    try {
      const refs = await getRefs(taskId);

      await sanityPost([
        {
          patch: {
            id: taskId,
            set: {
              subTasks: [
                ...refs.subTasks.filter((item) => !(item._ref === subTaskId)),
              ],
            },
          },
        },
      ]);

      await sanityPost([
        {
          delete: {
            id: subTaskId,
          },
        },
      ]);

      return { taskId, subTaskId };
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
            team->{_id},
            subTasks[]->
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
            team->{_id},
            subTasks[]->
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
      priority: task?.priority ? Number(task?.priority) : PRIORITY.LOW,
      createdAt: task._createdAt,
      updatedAt: task._updatedAt,
    };
  };

  return tasks.map((task) => {
    return {
      ...setResult(task),
      teamId: task?.team?._id ?? null,
      subTasks: (task?.subTasks ?? [])
        .map((subTask) => setResult(subTask))
        .filter((item) => item !== null),
      owners: task?.owners ?? [],
      assignees: task?.assignees ?? [],
      followers: task?.followers ?? [],
      type: !Boolean(task?.type) ? 'self' : task.type,
    };
  });
};

const getRefs = (taskId) => {
  return sanityClient.fetch(
    `*[_type == "task" && _id == $taskId][0]{
      owners,
      assignees,
      subTasks
  }`,
    { taskId }
  );
};

export const selectAllTasks = (state) => state.tasks.info;
export const selectLatestTask = (state) => {
  const tasks = selectAllTasks(state);
  return tasks[tasks.length - 1];
};

export const selectTaskById = (state, id) => {
  const tasks = selectAllTasks(state);
  return tasks.find((task) => task.id === id);
};

export const selectTasksByStatus = createSelector(selectAllTasks, (mytasks) => {
  const tasks = [...mytasks].reverse();

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
});

export const selectSubTaskById = createSelector(
  selectTaskById,
  (_, subTaskId) => subTaskId,
  (task, subTaskId) =>
    task ? task.subTasks.find((subTask) => subTask.id === subTaskId) : {}
);

export const selectOneTask = createSelector(selectTaskById, (selectTask) => {
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
});

export const selectTasksByTeam = createSelector(
  selectAllTasks,
  (_, teamId) => teamId,
  (tasks, teamId) => tasks.filter((task) => task.teamId === teamId)
);

export const selectTeamTasks = createSelector(selectAllTasks, (tasks) =>
  tasks.filter((task) => task.type === 'team')
);

export const selectTasksStatus = (state) => state.tasks.status;

export default tasksSlice.reducer;
