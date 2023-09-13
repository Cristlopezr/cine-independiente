import { apiSlice } from '@/api';
import { User } from '@/interfaces';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		loginUser: builder.mutation<{user:User, token:string, ok:boolean}, {email:string, password:string}>({
			query: (credentials) => ({
                url:'/login',
                method:'POST',
                body:credentials
            }),
			//!providesTags : ["User"]
		}),
		registerUser: builder.mutation<{user:User, token:string, ok:boolean},{ name: string; lastname: string; email: string; password: string }>({
			query: userData => ({
				url: '/',
				method: 'POST',
				body: userData,
			}),
			//!invalidatesTags:["User"]
		}),
		requestVerificationCode: builder.mutation<number, { email: string }>({
			query: email => ({
				url: '/emailVerification',
				method: 'POST',
				body: email,
			}),
		}),
		checkVerificationCode: builder.mutation<{ user: User; token: string },{ email: string; verificationCode: number }>({
			query: codeToken => ({
				url: '/checkVerificationCode',
				method: 'POST',
				body: codeToken,
			}),
		}),
        refreshToken: builder.query<{user:User, token:string, ok:boolean},void>({
            query:() => '/refresh'
        })
	}),
});

export const {
	useLoginUserMutation,
    useLazyRefreshTokenQuery,
	useRegisterUserMutation,
	useRequestVerificationCodeMutation,
	useCheckVerificationCodeMutation,
} = authApiSlice;