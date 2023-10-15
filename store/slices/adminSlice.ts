import { ReturnedAdminType } from '@/types/Admin';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface AdminState {
  value: ReturnedAdminType;
  error: string;
}

const initialState: AdminState = {
  value: {
    _id: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    email: '',
    name: '',
    ip: '',
    role: '',
  },
  error: '',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdmin.pending, (state) => {
        state.error = '';
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const getAdmin = createAsyncThunk(
  'admin/getAdmin',
  async (accessToken: string, thunkAPI) => {
    try {
      const res = await fetch(`/api/admin/profile/getAdminById`, {
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

      return data.admin;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
