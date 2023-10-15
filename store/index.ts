import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import smartContractSlice from './slices/mySmartContractsSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    smartContracts: smartContractSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
