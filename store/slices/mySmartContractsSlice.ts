import { SmartContractReturnType } from "@/types/SmartContract";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface SmartContractState {
  values: SmartContractReturnType[];
  error: string;
  isLoading: boolean;
}

const initialState: SmartContractState = {
  values: [],
  error: "",
  isLoading: true,
};

const smartContractSlice = createSlice({
  name: "smartContract",
  initialState,
  reducers: {
    setSmartContract: (state, action) => {
      state.values = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSmartContracts.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })
      .addCase(getSmartContracts.fulfilled, (state, action) => {
        state.values = action.payload;
        state.isLoading = false;
      })
      .addCase(getSmartContracts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const getSmartContracts = createAsyncThunk(
  "smartContract/getSmartContracts",
  async (accessToken: string, thunkAPI) => {
    try {
      const res = await fetch(
        "/api/user/smart-contract/getAllWithUserID",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = "";
        if (data?.message) errorMessage = data.message;
        else if (data?.error) errorMessage = data.error.message;
        else if (data[0]) errorMessage = data[0].message;

        return thunkAPI.rejectWithValue(errorMessage);
      }

      return data.smartContracts;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const { setSmartContract } = smartContractSlice.actions;
export default smartContractSlice.reducer;
