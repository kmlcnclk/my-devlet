import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import smartContractSlice from "./slices/mySmartContractsSlice";
import smartContractForAdminSlice from "./slices/mySmartContractsForAdminSlice";
import adminReducer from "./slices/adminSlice";
import generalReducer from "./slices/generalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    smartContracts: smartContractSlice,
    smartContractForAdmin: smartContractForAdminSlice,
    general: generalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
