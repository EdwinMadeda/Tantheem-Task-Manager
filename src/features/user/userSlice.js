import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs-react';
import sanityClient, {
  SANITY_URL,
  SANITY_AUTH_TOKEN,
} from '../../utils/sanityClient';
import axios from 'axios';
// import { createReadStream } from 'fs';
// import { basename } from 'path';

const initialState = {
  info: {},
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialState,
  },
  reducers: {
    signOut: (state, action) => {
      state.info = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.info = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.info = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const signUp = createAsyncThunk(
  'user/signUp',
  async (user, { rejectWithValue }) => {
    const createMutations = [
      {
        create: {
          _type: 'users',
          name: user.name,
          email: user.email,
          password: bcrypt.hashSync(user.password),
        },
      },
    ];

    try {
      const userExists = await sanityClient.fetch(
        `*[_type == "users" && email == $email][0]`,
        { email: user.email }
      );

      if (userExists) return rejectWithValue('Email Already Exists');
      else {
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
        `*[_type == "users" && (name == $name || email == $email)][0]`,
        { name: user.nameOrEmail, email: user.nameOrEmail }
      );

      if (!result) return rejectWithValue('No user');

      if (result && bcrypt.compareSync(user.password, result.password)) {
        return { _id: result._id, name: result.name, email: result.email };
      }

      return rejectWithValue('Wrong name, email or password');
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const uploadUserAvatar = createAsyncThunk(
  'user/uploadUserAvatar',
  (croppedImg, { rejectWithValue }) => {
    try {
      // sanityClient.assets.upload('image', createReadStream(croppedImg), {
      //   filename: basename(croppedImg),
      // });
    } catch (err) {
      if (err.isNetworkError) return rejectWithValue('Network Error!');
    }
  }
);

export const selectUser = (state) => state.user.info;

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
