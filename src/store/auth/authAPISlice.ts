import { cineApi } from '@/api';
import { User } from '@/interfaces';

export const authApiSlice = cineApi.injectEndpoints({
	endpoints: builder => ({
		loginUser: builder.mutation<{user:User, token:string, ok:boolean}, {email:string, password:string}>({
			query: (credentials) => ({
                url:'/user/login',
                method:'POST',
                body:credentials
            }),
			//!providesTags : ["User"]
		}),
		registerUser: builder.mutation<{user:User, token:string, ok:boolean},{ name: string; lastname: string; email: string; password: string }>({
			query: userData => ({
				url: '/user',
				method: 'POST',
				body: userData,
			}),
			//!invalidatesTags:["User"]
		}),
		updateUser: builder.mutation<{msg:string, updatedUser:User},{data:{avatarUrl?:string, name?:string, lastname?:string}, user_id:string}>({
			query: data => {
				return {
					url: '/user/update-user',
					method: 'PUT',
					body: {
						data:data.data,
						user_id:data.user_id
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
        refreshToken: builder.query<{user:User, token:string, ok:boolean},void>({
            query:() => '/user/refresh'
        })
	}),
});

export const {
	useLoginUserMutation,
    useLazyRefreshTokenQuery,
	useRegisterUserMutation,
	useRequestVerificationCodeMutation,
	useCheckVerificationCodeMutation,
	useUpdateUserMutation
} = authApiSlice;