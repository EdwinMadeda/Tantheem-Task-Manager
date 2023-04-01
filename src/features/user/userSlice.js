import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs-react';
import sanityClient, { urlFor, sanityPost } from '../../utils/sanityClient';
import jsCookie from '../../utils/jsCookie';

const initialState = {
  info: jsCookie.get('user'),
  status: {
    signIn: 'idle',
    signUp: 'idle',
    uploadUserAvatar: 'idle',
    editProfile: 'idle',
  },
  error: {
    signIn: null,
    signUp: null,
    uploadUserAvatar: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialState,
  },
  reducers: {
    signOut(state, action) {
      const info = [],
        { status, error } = initialState;
      state.info = info;
      state.status = status;
      state.error = error;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.status.signUp = 'pending';
        state.info = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status.signUp = 'succeeded';
        state.info = action.payload;
      })

      .addCase(signUp.rejected, (state, action) => {
        state.status.signUp = 'failed';
        state.error = action.payload;
      })

      .addCase(signIn.pending, (state, action) => {
        state.status.signIn = 'pending';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status.signIn = 'succeeded';
        state.info = action.payload;
        jsCookie.set('user', action.payload);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status.signIn = 'failed';
        state.error = action.payload;
      })

      .addCase(uploadUserAvatar.pending, (state, action) => {
        state.status.uploadUserAvatar = 'pending';
        state.info = { ...state.info, avatar: action.meta.arg };
      })
      .addCase(uploadUserAvatar.fulfilled, (state, action) => {
        state.status.uploadUserAvatar = 'succeeded';
        state.info = { ...state.info, avatar: action.payload };
        jsCookie.set('user', state.info);
      })
      .addCase(uploadUserAvatar.rejected, (state, action) => {
        state.status.uploadUserAvatar = 'failed';
        state.error.uploadUserAvatar = action.payload;
        state.info = jsCookie.get('user');
      })

      .addCase(editProfile.pending, (state, action) => {
        state.status.editProfile = 'pending';
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status.editProfile = 'succeeded';
        state.info = { ...state.info, ...action.payload };
        jsCookie.set('user', state.info);
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.status.editProfile = 'failed';
        state.error.editProfile = action.payload;
      });
  },
});

export const signUp = createAsyncThunk(
  'user/signUp',
  async (user, { rejectWithValue }) => {
    const createMutations = [
      {
        create: {
          _type: 'user',
          name: user.name,
          email: user.email,
          password: bcrypt.hashSync(user.password),
        },
      },
    ];

    try {
      const userExists = await sanityClient.fetch(
        `*[_type == "user" && email == $email][0]`,
        { email: user.email }
      );

      if (userExists) return rejectWithValue('Email Already Exists');
      else {
        const response = await sanityPost(createMutations);

        if (response?.data?.results?.[0]?.id) {
          return {
            _id: response.data.results[0].id,
            name: user.name,
            email: user.email,
          };
        } else return rejectWithValue('Sign Up failed!');
      }
    } catch (err) {
      if (err.isNetworkError) rejectWithValue('Network Error!');
    }
  }
);

export const signIn = createAsyncThunk(
  'user/signIn',
  async (user, { rejectWithValue }) => {
    try {
      const result = await sanityClient.fetch(
        `*[_type == "user" && (name == $name || email == $email)][0]`,
        { name: user.nameOrEmail, email: user.nameOrEmail }
      );

      if (!result) return rejectWithValue('No user');

      if (result && bcrypt.compareSync(user.password, result.password)) {
        return {
          _id: result._id,
          name: result.name,
          email: result.email,
          avatar: Boolean(result?.userAvatar)
            ? urlFor(result.userAvatar)
            : null,
        };
      }

      return rejectWithValue('Wrong name, email or password');
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const uploadUserAvatar = createAsyncThunk(
  'user/uploadUserAvatar',
  async (previewImg, { getState, rejectWithValue }) => {
    const { user } = getState();

    const { documentId } = await sanityClient.fetch(
      `*[_type == "user" && _id == $userId][0]{"documentId" : _id}`,
      { userId: user.info._id }
    );

    if (!documentId) return rejectWithValue('Upload failed');

    const blob = await (await fetch(previewImg)).blob();
    const file = new File([blob], 'file.jpg', {
      type: 'image/jpeg',
      lastModified: new Date(),
    });

    let response = null;

    await sanityClient.assets
      .upload('image', file, {
        contentType: file.type,
        filename: file.name,
      })
      .then((imageAsset) => {
        return sanityClient
          .patch(documentId)
          .set({
            userAvatar: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id,
              },
            },
          })
          .commit();
      })
      .then(async () => {
        const { userAvatar } = await sanityClient.fetch(
          `*[_type == "user" && _id == $userId][0]{userAvatar}`,
          { userId: user.info._id }
        );

        response = { data: urlFor(userAvatar), type: 'success' };
      })
      .catch((error) => {
        response = { data: error, type: 'error' };
        console.log(error);
      });

    if (response && response?.type === 'success') return response.data;
    return rejectWithValue('Upload failed');
  }
);

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async (profileData, { getState, rejectWithValue }) => {
    const { _id } = getState().user.info;
    try {
      await sanityPost([{ patch: { id: _id, set: { ...profileData } } }]);

      return profileData;
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const signOut = createAsyncThunk(
  'user/signOut',
  async (_, { dispatch }) => {
    dispatch({ type: 'user/signOut' });
    dispatch({ type: 'tasks/reset' });
    dispatch({ type: 'projects/reset' });
    dispatch({ type: 'teams/reset' });
    dispatch({ type: 'searchText/reset' });
    dispatch({ type: 'viewMore/reset' });
    jsCookie.remove('user');
    localStorage.clear();
  }
);

export const selectUser = (state) => state.user;

export default userSlice.reducer;
