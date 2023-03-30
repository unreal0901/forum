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
        return { url: 'auth/register', method: 'POST', body: data };
      },
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
          credentials: 'include',
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
      query(data) {
        return { url: `auth/verifyemail/${data.verification}`, method: 'GET' };
      },
    }),
    logoutUser: builder.mutation({
      query() {
        return {
          url: 'auth/logout',
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
