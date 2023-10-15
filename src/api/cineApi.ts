import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_CINE_BASE_URL;
const baseQuery = fetchBaseQuery({
	baseUrl,
	prepareHeaders: headers => {
		const token = localStorage.getItem('token');
		if (token) {
			headers.set('x-token', token);
		}
		return headers;
	},
});

/* const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
	let result = await baseQuery(args, api, extraOptions);
	
	if (result?.error?.status === 403) {
		console.log('Sending refresh token');
		
		const refreshResult = await baseQuery('/refresh', api, extraOptions);
		
		console.log(refreshResult);
		if (refreshResult?.data) {
			
			const user = (api.getState() as RootState).auth.user;
		
			api.dispatch(onLogin(user));

		
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(onLogout());
		}
	}

	return result;
}; */

export const cineApi = createApi({
	reducerPath: 'cineApi',
	baseQuery,
	endpoints: () => ({}),
	tagTypes:["movie"]
});
