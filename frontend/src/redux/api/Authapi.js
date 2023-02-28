import { createApi } from '@reduxjs/toolkit/query/react';
import { userApi } from './Userapi';
import customFetchBase from './customFetchBase';

// const BASE_URL = 'http://localhost:8000';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: builder => ({
    registerUser: builder.mutation({
      query(data) {
        return { url: 'register', method: 'POST', body: data };
      },
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          Credential: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    verifyEmail: builder.mutation({
      query({ verificationCode }) {
        return { url: `verifyemail/${verificationCode}`, method: 'GET' };
      },
    }),
    logoutUser: builder.mutation({
      query() {
        return {
          url: 'logout',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
} = authApi;
