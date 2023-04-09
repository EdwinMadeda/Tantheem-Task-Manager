import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';
import sanityClient, { sanityPost } from '../../../utils/sanityClient';
import { deleteProject } from '../../projects/projectsSlice';
import { deleteTask } from '../../tasks/taskSlice';
import { ADMIN_RIGHTS } from '../constants';

const initialState = {
  info: [],
  status: {
    fetchTeams: 'idle',
    addTeam: 'idle',
    editTeam: 'idle',
    deleteTeam: 'idle',
  },
  error: { fetchTeams: null, addTeam: null, editTeam: null, deleteTeam: null },
};

const teamsSlice = createSlice({
  name: 'teams',
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
      .addCase(fetchTeams.pending, (state, action) => {
        state.status.fetchTeams = 'pending';
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status.fetchTeams = 'succeeded';
        state.info = [...action.payload];
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status.fetchTeams = 'failed';
      })

      .addCase(addTeam.pending, (state, action) => {
        state.status.addTeam = 'pending';
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        state.status.addTeam = 'succeeded';
        state.info = state.info.concat(action.payload);
      })
      .addCase(addTeam.rejected, (state, action) => {
        state.status.addTeam = 'failed';
        state.error.addTeam = action.payload;
      })

      .addCase(editTeam.pending, (state, action) => {
        state.status.editTeam = 'pending';
      })
      .addCase(editTeam.fulfilled, (state, action) => {
        const { teamId, values } = action.payload;
        state.info = state.info.map((team) =>
          team.id === teamId ? { ...team, ...values } : team
        );
        state.status.editTeam = 'succeeded';
      })
      .addCase(editTeam.rejected, (state, action) => {
        state.status.editTeam = 'failed';
        state.error.editTeam = action.payload;
      })

      .addCase(deleteTeam.pending, (state, action) => {
        state.status.deleteTeam = 'pending';
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.status.deleteTeam = 'succeeded';
        state.info = state.info.filter((team) => team.id !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.status.deleteTeam = 'failed';
      });
  },
});

export const addTeam = createAsyncThunk(
  'teams/addTeam',
  async (team, { getState, rejectWithValue }) => {
    const userId = getState().user.info._id;
    const setRightsVals = (constRights) => {
      return Object.values(constRights).map(({ value }) => value);
    };

    const createMutations = [
      {
        create: {
          _type: 'team',
          ...team,
          createdBy: {
            _ref: userId,
            _type: 'reference',
            _key: nanoid(),
          },
          ledBy: [
            {
              alias: `teamLead${userId}`,
              participant: {
                _ref: userId,
                _type: 'reference',
                _key: nanoid(),
              },
              adminRights: {
                leadership: setRightsVals(ADMIN_RIGHTS.leadership),
                membership: setRightsVals(ADMIN_RIGHTS.membership),
                invites: {
                  toLeadership: true,
                  toMembership: true,
                },
              },
              status: 'In Service',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        },
      },
    ];

    console.log(createMutations);

    const response = await sanityPost(createMutations);

    const newTeamId = response?.data?.results?.[0]?.id;

    if (newTeamId) {
      const newTeam = await sanityClient.fetch(
        `*[_type == "team" &&  _id == $newTeamId && !(_id in path('drafts.**'))][0]{
          ...,
          createdBy->{_id, name, email, userAvatar},
          ledBy[]{
            participant->{_id, name, email, userAvatar},
            adminRights
          },
          members[]{
            participant->{_id, name, email},
            teamRights
          },
        }`,
        {
          newTeamId,
        }
      );

      return refactorfetchedTeams([newTeam]);
    } else return rejectWithValue('Operation failed!');
  }
);

export const editTeam = createAsyncThunk(
  'teams/editTeam',
  async ({ teamId, values }, { getState, rejectWithValue }) => {
    try {
      await sanityPost([
        {
          patch: {
            id: teamId,
            set: {
              ...values,
            },
          },
        },
      ]);

      return { teamId, values };
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const deleteTeam = createAsyncThunk(
  'teams/deleteTeam',
  async (teamId, { getState, dispatch, rejectWithValue }) => {
    const {
      tasks: { info: taskInfo },
      projects: { info: projectInfo },
    } = getState();
    const teamTasks = taskInfo.filter((task) => task.teamId === teamId) ?? [];
    const teamProjects =
      projectInfo.filter((project) => project.teamId === teamId) ?? [];

    try {
      teamTasks.forEach((task) => {
        dispatch(deleteTask(task.id));
      });

      teamProjects.forEach((project) => {
        dispatch(deleteProject(project.id));
      });

      const deleteInviteIds = await sanityClient.fetch(
        `*[_type == "invite" && references($teamId)]{
            _id
       }`,
        { teamId }
      );

      const responseOk = await (deleteInviteIds ?? []).every(async (invite) => {
        const response = await sanityPost([
          {
            delete: {
              id: invite._id,
            },
          },
        ]);
        return response.status === 200;
      });

      if (responseOk) {
        await sanityPost([
          {
            delete: {
              id: teamId,
            },
          },
        ]);
        return teamId;
      } else rejectWithValue('Team not deleted');
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (_, { getState, rejectWithValue }) => {
    const { _id: userId } = getState().user.info;
    try {
      const teams = await sanityClient.fetch(
        `*[_type == "team" && references($userId) && !(_id in path('drafts.**'))]{
          ...,
          createdBy->{_id, name, email, userAvatar},
          ledBy[]{
            participant->{_id, name, email, userAvatar},
            adminRights
          },
          members[]{
            participant->{_id, name, email},
            memberRights
          },
        }`,
        {
          userId,
        }
      );

      return refactorfetchedTeams(teams);
    } catch (err) {
      console.log(err);
    }
  }
);

export const refactorfetchedTeams = (teams) => {
  const refactorResult = (team) => {
    return {
      id: team._id,
      name: team.name,
      description: team?.description ?? '',
      createdBy: team?.createdBy,
      ledBy: team?.ledBy,
      members: team?.members,
      createdAt: team._createdAt,
      updatedAt: team._updatedAt,
    };
  };

  const result = teams.map((team) => refactorResult(team));

  return result;
};

export const selectAllTeams = (state) => state.teams.info;
export const selectLatestTeam = (state) => {
  const teams = selectAllTeams(state);
  return teams[teams.length - 1];
};

export const selectTeamById = createSelector(
  selectAllTeams,
  (_, teamId) => teamId,
  (teams, teamId) => teams.find((team) => team.id === teamId)
);

export const selectTeamsByLedBy = createSelector(
  selectAllTeams,
  (_, userId) => userId,
  (teams, userId) =>
    teams.filter((team) => team.ledBy.find((item) => item._id === userId))
);

export const selectTeamsStatus = (state) => state.teams.status;

export default teamsSlice.reducer;
