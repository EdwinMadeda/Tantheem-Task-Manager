import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';

import sanityClient, { sanityPost } from '../../utils/sanityClient';

export const STATUS = Object.freeze({
  IN_PROGRESS: 'In Progress',
  COMPLETE: 'Complete',
  TO_DO: 'To Do',
});

const initialState = {
  info: [],
  status: {
    fetchProjects: 'idle',
    addProject: 'idle',
    editProject: 'idle',
    deleteProject: 'idle',
    addDeliverable: 'idle',
    editDeliverable: 'idle',
    deleteDeliverable: 'idle',
  },
  error: {
    fetchProjects: null,
  },
};

const projectsSlice = createSlice({
  name: 'projects',
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
      .addCase(fetchProjects.pending, (state, action) => {
        state.status.fetchProjects = 'pending';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status.fetchProjects = 'succeeded';
        state.info = [...action.payload];
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status.fetchProjects = 'failed';
      })

      .addCase(addProject.pending, (state, action) => {
        state.status.addProject = 'pending';
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.status.addProject = 'succeeded';
        state.info = state.info.concat(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status.addProject = 'failed';
        state.error.addProject = action.payload;
      })

      .addCase(editProject.pending, (state, action) => {
        state.status.editProject = 'pending';
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const { projectId, values } = action.payload;
        state.info = state.info.map((project) =>
          project.id === projectId ? { ...project, ...values } : project
        );
        state.status.editProject = 'succeeded';
      })
      .addCase(editProject.rejected, (state, action) => {
        state.status.editProject = 'failed';
        state.error.editProject = action.payload;
      })

      .addCase(deleteProject.pending, (state, action) => {
        state.status.deleteProject = 'pending';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status.deleteProject = 'succeeded';
        state.info = state.info.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status.deleteProject = 'failed';
      })

      .addCase(addDeliverable.pending, (state, action) => {
        state.status.addDeliverable = 'pending';
      })
      .addCase(addDeliverable.fulfilled, (state, action) => {
        const { projectId, newDeliverable } = action.payload;
        state.info = state.info.map((project) =>
          project.id === projectId
            ? {
                ...project,
                deliverables: [...project.deliverables, newDeliverable],
              }
            : project
        );

        state.status.addDeliverable = 'succeeded';
      })
      .addCase(addDeliverable.rejected, (state, action) => {
        state.status.addDeliverable = 'failed';
        state.error.addDeliverable = action.payload;
      })

      .addCase(editDeliverable.pending, (state, action) => {
        state.status.editDeliverable = 'pending';
      })
      .addCase(editDeliverable.fulfilled, (state, action) => {
        const { projectId, deliverableId, values } = action.payload;
        state.info = state.info.map((project) =>
          project.id === projectId
            ? {
                ...project,
                deliverables: project.deliverables.map((deliverable) =>
                  deliverable.id === deliverableId
                    ? { ...deliverable, ...values }
                    : deliverable
                ),
              }
            : project
        );

        state.status.editDeliverable = 'succeeded';
      })
      .addCase(editDeliverable.rejected, (state, action) => {
        state.status.editDeliverable = 'failed';
        state.error.editDeliverable = action.payload;
      })

      .addCase(deleteDeliverable.pending, (state, action) => {
        state.status.deleteDeliverable = 'pending';
      })
      .addCase(deleteDeliverable.fulfilled, (state, action) => {
        const { projectId, deliverableId } = action.payload;
        state.info = state.info.map((project) =>
          project.id === projectId
            ? {
                ...project,
                deliverables: project.deliverables.filter(
                  (deliverable) => deliverable.id !== deliverableId
                ),
              }
            : project
        );

        state.status.deleteDeliverable = 'succeeded';
      })
      .addCase(deleteDeliverable.rejected, (state, action) => {
        state.status.deleteDeliverable = 'failed';
      });
  },
});

export const addProject = createAsyncThunk(
  'projects/addProject',
  async (project, { getState, rejectWithValue }) => {
    const createMutations = [
      {
        create: {
          _type: 'project',
          ...project,
          createdBy: {
            _ref: getState().user.info._id,
            _type: 'reference',
            _key: nanoid(),
          },
          managedBy: [
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

    const newProjectId = response?.data?.results?.[0]?.id;

    if (newProjectId) {
      const newProject = await sanityClient.fetch(
        `*[_type == "project" && _id == $newProjectId  && !(_id in path('drafts.**'))][0]`,
        {
          newProjectId,
        }
      );

      return refactorfetchedProjects([newProject]);
    } else return rejectWithValue('Operation failed!');
  }
);

export const editProject = createAsyncThunk(
  'projects/editProject',
  async ({ projectId, values }, { getState, rejectWithValue }) => {
    try {
      await sanityPost([
        {
          patch: {
            id: projectId,
            set: {
              ...values,
            },
          },
        },
      ]);

      return { projectId, values };
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId, { getState, rejectWithValue }) => {
    const {
      projects: { info },
    } = getState();
    const deliverables = (info.find((item) => item.id === projectId) ?? [])
      ?.deliverables;

    const deliverableDeleteMutations = deliverables.map((deliverable) => ({
      delete: {
        id: deliverable.id,
      },
    }));

    try {
      await sanityPost([
        {
          delete: {
            id: projectId,
          },
        },
        ...deliverableDeleteMutations,
      ]);

      return projectId;
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const addDeliverable = createAsyncThunk(
  'projects/addDeliverable',
  async ({ projectId, newDeliverable }, { getState, rejectWithValue }) => {
    const refs = await getRefs(projectId);

    try {
      const { data } = await sanityPost([
        {
          create: {
            _type: 'deliverable',
            ...newDeliverable,
          },
        },
      ]);

      const { id } = data?.results?.[0];
      if (id) {
        await sanityPost([
          {
            patch: {
              id: projectId,
              set: {
                deliverables: [
                  ...(refs?.deliverables ?? []),
                  { _key: nanoid(), _ref: id, _type: 'reference' },
                ],
              },
            },
          },
        ]);

        return { projectId, newDeliverable: { id, ...newDeliverable } };
      } else rejectWithValue('Add Deliverable failed');
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const editDeliverable = createAsyncThunk(
  'projects/editDeliverable',
  async (
    { projectId, deliverableId, values },
    { getState, rejectWithValue }
  ) => {
    try {
      await sanityPost([
        {
          patch: {
            id: deliverableId,
            set: {
              ...values,
            },
          },
        },
      ]);
      return { projectId, deliverableId, values };
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const deleteDeliverable = createAsyncThunk(
  'projects/deleteDeliverable',
  async ({ projectId, deliverableId }, { getState, rejectWithValue }) => {
    try {
      const refs = await getRefs(projectId);

      await sanityPost([
        {
          patch: {
            id: projectId,
            set: {
              deliverables: [
                ...refs.deliverables.filter(
                  (item) => !(item._ref === deliverableId)
                ),
              ],
            },
          },
        },
      ]);

      await sanityPost([
        {
          delete: {
            id: deliverableId,
          },
        },
      ]);

      return { projectId, deliverableId };
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { getState, rejectWithValue }) => {
    const { _id: userId } = getState().user.info;
    try {
      const projects = await sanityClient.fetch(
        `*[_type == "project" && references($userId)  && !(_id in path('drafts.**'))]{
          ...,
          managedBy[]->{_id, name, email, userAvatar},
          team->{_id},
          deliverables[]->,
      }`,
        { userId }
      );

      const teams = await sanityClient.fetch(
        `*[_type == "team" && references($userId) && !(_id in path('drafts.**'))]{
          "projects" : *[_type == "project" && references(^._id)]{
           ...,
           managedBy[]->{_id, name, email, userAvatar},
           team->{_id},
           deliverables[]->,
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

const getRefs = (projectId) => {
  return sanityClient.fetch(
    `*[_type == "project" && _id == $projectId  && !(_id in path('drafts.**'))][0]{
      managedBy,
      team,
      deliverables
  }`,
    { projectId }
  );
};

export const selectAllProjects = (state) => state.projects.info;

export const selectLatestProject = (state) => {
  const projects = selectAllProjects(state);
  return projects[projects.length - 1];
};

export const selectProjectsByTeam = createSelector(
  selectAllProjects,
  (_, teamId) => teamId,
  (projects, teamId) => projects.filter((project) => project.teamId === teamId)
);

export const selectProjectById = createSelector(
  selectAllProjects,
  (_, projectId) => projectId,
  (projects, projectId) => projects.find((project) => project.id === projectId)
);

export const selectDeliverableById = createSelector(
  selectProjectById,
  (_, deliverableId) => deliverableId,
  (project, deliverableId) => {
    return project
      ? project.deliverables.find(
          (deliverable) => deliverable.id === deliverableId
        )
      : {};
  }
);

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

export const selectOneProject = createSelector(
  selectProjectById,
  (selectProject) => {
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
  }
);

export const totalDeliverablesCount = (state, id) => {
  const targetProject = selectAllProjects(state).find(
    (project) => project.id === id
  );
  const deliverables = targetProject?.deliverables;
  if (deliverables) return targetProject?.deliverables?.length;
  return 0;
};
export const completeDeliverablesCount = (state, id) => {
  const targetProject = selectAllProjects(state).find(
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
export const selectProjectsStatus = (state) => state.projects.status;

export default projectsSlice.reducer;
