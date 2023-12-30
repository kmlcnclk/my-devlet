import { ReturnedUserType } from '@/types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  value: ReturnedUserType;
  error: string;
}

const initialState: UserState = {
  value: {
    _id: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    email: '',
    name: '',
    identityNumber: 0,
    age: 0,
    uniqueID: '',
    isUserDataAddedToBlockchain: false,
    address: '',
    privateKey: '',
  },
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.error = '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const getUser = createAsyncThunk(
  'user/getUser',
  async (accessToken: string, thunkAPI) => {
    try {
      const res = await fetch(`/api/user/profile/getUserById`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = '';
        if (data?.message) errorMessage = data.message;
        else if (data?.error) errorMessage = data.error.message;
        else if (data[0]) errorMessage = data[0].message;

        return thunkAPI.rejectWithValue(errorMessage);
      }

      return data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
