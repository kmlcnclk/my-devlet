import { createSlice } from "@reduxjs/toolkit";

export interface GeneralValueType {
  walletAddress: string;
  currentNetwork: string;
  currentBalance: number;
}

export interface GeneralState {
  value: GeneralValueType;
}

const initialState: GeneralState = {
  value: {
    walletAddress: "",
    currentNetwork: "bsc",
    currentBalance: 0,
  },
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setCurrentNetwork: (state, action) => {
      state.value.currentNetwork = action.payload;
    },
    setWalletAddress: (state, action) => {
      state.value.walletAddress = action.payload;
    },
    setCurrentBalance: (state, action) => {
      state.value.currentBalance = action.payload;
    },
  },
});

export const { setCurrentBalance, setCurrentNetwork, setWalletAddress } =
  generalSlice.actions;

export default generalSlice.reducer;
