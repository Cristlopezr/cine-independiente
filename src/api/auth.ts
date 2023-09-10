import { User } from '@/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://server-cine-independiente.vercel.app/api/user';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	tagTypes: ['User'],
	endpoints: builder => ({
		getUser: builder.query<User, void>({
			query: () => '/',
			//!providesTags : ["User"]
		}),
		registerUser: builder.mutation<void,{name:string, lastname:string, email:string, password:string}>({
			query: user => ({
				url: '/',
				method: 'POST',
				body: user,
			}),
			//!invalidatesTags:["User"]
		}),
		requestVerificationCode: builder.mutation<number, {email:string}>({
			query: email => ({
				url: '/emailVerification',
				method: 'POST',
				body: email,
			}),
		}),
		checkVerificationCode: builder.mutation<User, { email: string; code: number }>({
			query: token => ({
				url: '/checkVerificationCode',
				method: 'POST',
				body: token,
			}),
		}),
	}),
});

export const {
	useGetUserQuery,
	useRegisterUserMutation,
	useRequestVerificationCodeMutation,
	useCheckVerificationCodeMutation,
} = authApi;
