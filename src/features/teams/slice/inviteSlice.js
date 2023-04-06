import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import sanityClient, { sanityPost } from '../../../utils/sanityClient';

const initialState = {
  info: { sent: [], received: [] },
  status: {
    fetchInvites: 'idle',
    inviteParticipant: 'idle',
    deleteParticipantInvite: 'idle',
  },
  error: {
    fetchInvites: null,
    inviteParticipant: null,
    deleteParticipantInvite: null,
  },
  currInvite: null,
};

const inviteSlice = createSlice({
  name: 'invites',
  initialState,
  reducers: {
    reset(state, action) {
      const info = { sent: [], received: [] },
        { status, error } = initialState;
      state.info = info;
      state.status = status;
      state.error = error;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(inviteParticipant.pending, (state, action) => {
        state.status.inviteParticipant = 'pending';
      })
      .addCase(inviteParticipant.fulfilled, (state, action) => {
        state.status.inviteParticipant = 'succeeded';
        state.info.sent.push(action.payload);
      })
      .addCase(inviteParticipant.rejected, (state, action) => {
        state.status.inviteParticipant = 'failed';
      })

      .addCase(editParticipantInvite.pending, (state, action) => {
        state.status.inviteParticipant = 'pending';
      })
      .addCase(editParticipantInvite.fulfilled, (state, action) => {
        const { inviteId } = action.payload;

        state.status.inviteParticipant = 'succeeded';
        state.info.sent = state.info.sent.map((item) =>
          item.id === inviteId ? { ...item, ...action.payload } : item
        );
      })
      .addCase(editParticipantInvite.rejected, (state, action) => {
        state.status.inviteParticipant = 'failed';
      })

      .addCase(deleteParticipantInvite.pending, (state, action) => {
        state.status.deleteParticipantInvite = 'pending';
      })
      .addCase(deleteParticipantInvite.fulfilled, (state, action) => {
        const inviteId = action.payload;

        state.info.sent = state.info.sent.filter(
          (item) => item.id !== inviteId
        );
        state.status.deleteParticipantInvite = 'succeeded';
      })
      .addCase(deleteParticipantInvite.rejected, (state, action) => {
        state.status.deleteParticipantInvite = 'failed';
      })

      .addCase(fetchInvites.pending, (state, action) => {
        state.status.fetchInvites = 'pending';
      })
      .addCase(fetchInvites.fulfilled, (state, action) => {
        state.status.inviteParticipant = 'succeeded';
        state.info = { ...state.info, ...action.payload };
      })
      .addCase(fetchInvites.rejected, (state, action) => {
        state.status.inviteParticipant = 'failed';
      });
  },
});

export const inviteParticipant = createAsyncThunk(
  'teams/inviteParticipant',
  async (
    { nameOrEmail, teamId, role, adminRights, memberRights },
    { getState, rejectWithValue }
  ) => {
    const userId = getState().user.info._id;

    try {
      const result = await sanityClient.fetch(
        `*[_type == "user" && (name == $name || email == $email)  && !(_id in path('drafts.**'))][0]`,
        { name: nameOrEmail, email: nameOrEmail }
      );

      if (!result) return rejectWithValue('No user with such credentials');

      if (result) {
        if (result._id === userId)
          return rejectWithValue('You cannot invite yourself to the team');

        const participantExists = await sanityClient.fetch(
          `*[_type == "team" && references($participantId) && _id == $teamId && !(_id in path('drafts.**'))]`,
          {
            participantId: result._id,
            teamId,
          }
        );

        if (participantExists.length > 0)
          return rejectWithValue(
            `${result.name} is already a participant in the team & cannot be invited`
          );

        const inviteExists = await sanityClient.fetch(
          `*[_type == "invite" && references($participantId) && references($teamId) && status=="Accepted" && !(_id in path('drafts.**'))]`,
          {
            participantId: result._id,
            teamId,
          }
        );

        if (inviteExists.length > 0)
          return rejectWithValue(
            `${result.name} has already been invited to the team & accepted the invitation`
          );

        const participantRights =
          role === 'toLeadership'
            ? { adminRights }
            : role === 'toMembership'
            ? { memberRights }
            : {};
        const participantRole =
          role === 'toLeadership'
            ? 'teamLead'
            : role === 'toMembership'
            ? 'member'
            : '';

        const createMutations = [
          {
            create: {
              _type: 'invite',
              alias: `Participant_${userId}`,
              sentBy: {
                _ref: userId,
                _type: 'reference',
                _key: nanoid(),
              },
              participant: {
                _ref: result._id,
                _type: 'reference',
                _key: nanoid(),
              },
              inviteTo: {
                _ref: teamId,
                _type: 'reference',
                _key: nanoid(),
              },
              role: participantRole,
              ...participantRights,
              status: 'On Invite',
            },
          },
        ];

        const response = await sanityPost(createMutations);
        if (response?.data?.results?.[0]?.id) {
          return {
            id: response.data.results[0].id,
            sentBy: getState().user.info,
            participant: {
              _id: result._id,
              name: result.name,
              email: result.email,
            },
            inviteTo: {
              id: teamId,
              name:
                getState().teams.info.find((item) => item.id === teamId)
                  ?.name ?? '',
            },
            role: participantRole,
            status: 'On Invite',
            ...participantRights,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        } else return rejectWithValue('Send invite failed!');
      }
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const editParticipantInvite = createAsyncThunk(
  'invites/editParticipantInvite',
  async (
    { inviteId, role, adminRights, memberRights },
    { getState, rejectWithValue }
  ) => {
    const participantRights =
      role === 'toLeadership'
        ? { adminRights }
        : role === 'toMembership'
        ? { memberRights }
        : {};
    const participantRole =
      role === 'toLeadership'
        ? 'teamLead'
        : role === 'toMembership'
        ? 'member'
        : '';

    try {
      await sanityPost([
        {
          patch: {
            id: inviteId,
            set: {
              role: participantRole,
              ...participantRights,
            },
          },
        },
      ]);
      return { inviteId, role: participantRole, ...participantRights };
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const deleteParticipantInvite = createAsyncThunk(
  'invites/deleteParticipantInvite',
  async (inviteId, { getState, rejectWithValue }) => {
    try {
      await sanityPost([
        {
          delete: {
            id: inviteId,
          },
        },
      ]);
      return inviteId;
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const fetchInvites = createAsyncThunk(
  'invites/fetchInvites',
  async (_, { getState, rejectWithValue }) => {
    const {
      user: {
        info: { _id: userId },
      },
    } = getState();

    try {
      const invites = await sanityClient.fetch(
        `*[_type == "invite" && references($userId)]{
          ...,
          inviteTo->{_id, name},
          participant->{_id, name, email},
          sentBy->{_id, name, email},
       }`,
        {
          userId,
        }
      );

      const myInvites = refactorfetchedInvites(invites);

      return {
        sent: myInvites.filter((item) => item.sentBy._id === userId) ?? [],
        received:
          myInvites.filter((item) => item.participant._id === userId) ?? [],
      };
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

const refactorfetchedInvites = (invites) => {
  return invites.map((item) => ({
    id: item._id,
    sentBy: item.sentBy,
    participant: item.participant,
    inviteTo: item.inviteTo,
    role: item.role,
    adminRights: item.adminRights ?? {
      leadership: [],
      membershipe: [],
    },
    memberRights: item.memberRights ?? [],
    status: item.status,
    createdAt: item._createdAt,
    updatedAt: item._updatedAt,
  }));
};

export const selectSentInvites = (state) => state.invites.info.sent;
export const selectRecievedInvites = (state) => state.invites.info.received;
export const selectAllInvites = (state) => state.invites.info;

export const selectInviteStatus = (state) => state.invites.status;
export default inviteSlice.reducer;
