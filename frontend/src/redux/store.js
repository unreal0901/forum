import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/Authapi';
import { userApi } from './api/Userapi';
import userReducer from './features/UserSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userState: userReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware]),
});
