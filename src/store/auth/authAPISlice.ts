import { cineApi } from '@/api';
import { EditUser, User } from '@/interfaces';

export const authApiSlice = cineApi.injectEndpoints({
	endpoints: builder => ({
		loginUser: builder.mutation<{ user: User; token: string; ok: boolean },{ email: string; password: string }>({
			query: credentials => ({
				url: '/user/login',
				method: 'POST',
				body: credentials,
			}),
			//!providesTags : ["User"]
		}),
		registerUser: builder.mutation<{ user: User; token: string; ok: boolean },{ name: string; lastname: string; email: string; password: string }>({
			query: userData => ({
				url: '/user',
				method: 'POST',
				body: userData,
			}),
			//!invalidatesTags:["User"]
		}),
		updateUser: builder.mutation<{ msg: string; updatedUser: User }, { data: EditUser }>({
			query: ({data}) => {
				return {
					url: '/user/update-user',
					method: 'PUT',
					body: {
						data: data,
						user_id: data.user_id,
					},
				};
			},
		}),
		requestVerificationCode: builder.mutation<number, { email: string }>({
			query: email => ({
				url: '/user/emailVerification',
				method: 'POST',
				body: email,
			}),
		}),
		checkVerificationCode: builder.mutation<{ user: User; token: string },{ email: string; verificationCode: number }>({
			query: codeToken => ({
				url: '/user/checkVerificationCode',
				method: 'POST',
				body: codeToken,
			}),
		}),
		passwordRecover: builder.mutation<{ msg:string },{ email: string }>({
			query: email => ({
				url: '/user/password-change-request',
				method: 'POST',
				body: email,
			}),
		}),
		resetPassword: builder.mutation<{ msg:string },{ newPassword: string, user_id:string }>({
			query: data => ({
				url: '/user/reset-password',
				method: 'POST',
				body: data,
			}),
		}),
		refreshToken: builder.query<{ user: User; token: string; ok: boolean }, void>({
			query: () => '/user/refresh',
		}),
	}),
});

export const {
	useLoginUserMutation,
	useLazyRefreshTokenQuery,
	useRegisterUserMutation,
	useRequestVerificationCodeMutation,
	useCheckVerificationCodeMutation,
	useUpdateUserMutation,
	usePasswordRecoverMutation,
	useResetPasswordMutation
} = authApiSlice;
