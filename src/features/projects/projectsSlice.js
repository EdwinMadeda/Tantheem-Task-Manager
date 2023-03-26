import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PRIORITY } from '../../utils/constants';
import sanityClient from '../../utils/sanityClient';

export const STATUS = Object.freeze({
  IN_PROGRESS: 'In Progress',
  COMPLETE: 'Complete',
  TO_DO: 'To Do',
});

const initialState = {
  info: [],
  status: {
    fetchProjects: 'idle',
  },
  error: {
    fetchProjects: null,
  },
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject(state, action) {
      const id = state.length + 1;
      state.push({ id, ...action.payload, deliverables: [] });
    },
    editProject(state, action) {
      return state.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );
    },
    deleteProject(state, action) {
      return state.filter((project) => project.id !== action.payload);
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
      .addCase(fetchProjects.pending, (state, action) => {
        state.status.fetchProjects = 'pending';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status.fetchProjects = 'succeeded';
        state.info = [...action.payload];
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status.fetchProjects = 'failed';
      });
  },
});

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { getState, rejectWithValue }) => {
    const { _id: userId } = getState().user.info;
    try {
      const { projects } = await sanityClient.fetch(
        `*[_type == "user" && _id == $userId][0]{
        "projects" : *[_type == "project" && references(^._id)]{
          ...,
          managedBy[]->{_id, name, email, userAvatar},
          team->{_id},
          deliverables[]->,
        },
      }`,
        { userId }
      );

      const { teams } = await sanityClient.fetch(
        ` *[_type == "user" && _id == $userId][0]{
        "teams" : *[_type == "team" && references(^._id)]{
         "projects" : *[_type == "project" && references(^._id)]{
          ...,
          managedBy[]->{_id, name, email, userAvatar},
          team->{_id},
          deliverables[]->,
        }
        }
        }`,
        { userId }
      );

      const teamProjects = teams.filter((team) => team.projects.length !== 0);

      let result = [];
      teamProjects.forEach((item) => {
        const myProjects = item.projects.map((project) => ({
          ...project,
          type: 'team',
        }));
        result = [...result, ...myProjects];
      });

      return refactorfetchedProjects(
        projects
          .filter((project) => !result.find((item) => project._id === item._id))
          .concat(result)
      );
    } catch (err) {
      console.log(err);
    }
  }
);

const refactorfetchedProjects = (projects) => {
  const refactorResult = (project) => {
    return {
      id: project._id,
      name: project?.name ?? '',
      description: project?.description ?? '',
      status: project?.status ?? STATUS.TO_DO,
      priority: project?.priority ?? PRIORITY.LOW,
      startDate: project?.startDate ?? null,
      endDate: project?.endDate ?? null,
      createdAt: project._createdAt,
      updatedAt: project._updatedAt,
    };
  };

  return projects.map((project) => {
    return {
      ...refactorResult(project),
      teamId: project?.team?._id ?? null,
      deliverables: (project?.deliverables ?? []).map((deliverable) =>
        refactorResult(deliverable)
      ),
      type: !Boolean(project?.type) ? 'self' : project.type,
    };
  });
};

export const selectAllProjects = (state) => state.projects.info;

export const selectLatestProject = (state) =>
  state.projects.info[state.projects.info.length - 1];

export const selectProjectsByTeam = (state, teamId) => {
  return state.projects.info.filter((project) => project.teamId === teamId);
};

export const selectProjectById = (state, projectId) =>
  state.projects.info.find((project) => project.id === projectId);

export const selectDeliverableById = (state, projectId, deliverableId) => {
  const project = selectProjectById(state, projectId);
  return project
    ? project.deliverables.find(
        (deliverable) => deliverable.id === deliverableId
      )
    : {};
};

export const selectProjectsByStatus = (state) => {
  const projects = [...selectAllProjects(state)].reverse();

  const isProjectComplete = (project) => {
    const deliverables = project.deliverables;
    const zeroDeliverables = deliverables.length === 0;
    return zeroDeliverables
      ? zeroDeliverables && project.status === STATUS.COMPLETE
      : deliverables.every(
          (deliverable) => deliverable.status === STATUS.COMPLETE
        );
  };

  return {
    previousProjects: projects.filter((project) => isProjectComplete(project)),
    toDoProjects: projects.filter((project) => !isProjectComplete(project)),
  };
};

export const selectOneProject = (state, projectId) => {
  const selectProject = selectProjectById(state, projectId);
  let toDo = [],
    inProgress = [],
    complete = [],
    completeDeliverables = 0,
    totalDeliverables = 0;

  if (selectProject?.deliverables) {
    const filterProject = (status) =>
      selectProject.deliverables.filter(
        (deliverable) => deliverable.status === status
      );

    toDo = filterProject(STATUS.TO_DO);
    inProgress = filterProject(STATUS.IN_PROGRESS);
    complete = filterProject(STATUS.COMPLETE);

    completeDeliverables = complete.length;
    totalDeliverables = selectProject.deliverables.length;
  }

  return {
    selectProject,
    deliverables: { toDo, inProgress, complete },
    completeDeliverables,
    totalDeliverables,
  };
};

export const totalDeliverablesCount = (state, id) => {
  const targetProject = state.projects.info.find(
    (project) => project.id === id
  );
  const deliverables = targetProject?.deliverables;
  if (deliverables) return targetProject?.deliverables?.length;
  return 0;
};
export const completeDeliverablesCount = (state, id) => {
  const targetProject = state.projects.info.find(
    (project) => project.id === id
  );
  const deliverables = targetProject?.deliverables;
  if (deliverables) {
    return deliverables.filter(
      (deliverable) => deliverable.status === STATUS.COMPLETE
    );
  }
  return 0;
};

export const { addProject, editProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;
