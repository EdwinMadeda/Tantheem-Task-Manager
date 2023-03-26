import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import format from 'date-fns/format';
import sanityClient from '../../utils/sanityClient';

const initialState = {
  info: [],
  status: { fetchTeams: 'idle' },
  error: { fetchTeams: null },
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addTeam(state, action) {
      const id = state.length + 1;
      state.push({
        id,
        ...action.payload,
        memberIDs: [],
        teamIDs: [],
        createdAt: format(new Date(), 'yyyy-MM-dd'),
      });
    },
    editTeam(state, action) {
      return state.map((team) =>
        team.id === action.payload.id ? action.payload : team
      );
    },
    deleteTeam(state, action) {
      return state.filter((team) => team.id !== action.payload);
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
      .addCase(fetchTeams.pending, (state, action) => {
        state.status.fetchTeams = 'pending';
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status.fetchTeams = 'succeeded';
        state.info = [...action.payload];
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status.fetchTeams = 'failed';
      });
  },
});

export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (_, { getState, rejectWithValue }) => {
    const { _id: userId } = getState().user.info;
    try {
      const { teams } = await sanityClient.fetch(
        `*[_type == "user" && _id == $userId][0]{
            "teams" : *[_type == "team" && references(^._id)]{
              ...,
              ledBy[]->{_id, name, email, userAvatar},
              members[]->{_id},
            }
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
      ledBy: (team?.ledBy ?? []).map((user) => user?._id),
      memberIDs: (team?.members ?? []).map((member) => member?._id),
      createdAt: team._createdAt,
      updatedAt: team._updatedAt,
    };
  };

  const result = teams.map((team) => refactorResult(team));

  return result;
};

export const selectAllTeams = (state) => state.teams.info;
export const selectLatestTeam = (state) =>
  state.teams.info[state.teams.info.length - 1];
export const selectTeamById = (state, teamId) =>
  state.teams.info.find((team) => team.id === teamId);

export const { addTeam, editTeam, deleteTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
