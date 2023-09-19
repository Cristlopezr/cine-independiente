import { RootState } from '@/store';
import { onLogin, onLogout } from '@/store/auth';
import { /* BaseQueryApi, FetchArgs,  */ createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//!Development
const baseUrl = 'http://localhost:3000/api';

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
	//!Solo si es que hay un error que es codigo 403 se genera un nuevo token
	//!Si no se deslogea
	if (result?.error?.status === 403) {
		console.log('Sending refresh token');
		//!Send refresh token to get new acces token
		const refreshResult = await baseQuery('/refresh', api, extraOptions);
		//! /refresh es el endpoint del backend, cambiar si es que es diferente
		console.log(refreshResult);
		if (refreshResult?.data) {
			//!Si es que estamos trantando de refrescar el token, el usuario ya deberia estar en el estado
			const user = (api.getState() as RootState).auth.user;
			//!Store the new token
			api.dispatch(onLogin(user));

			//!Intentar de nuevo la llamada
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(onLogout());
		}
	}

	return result;
}; */

export const videoApi = createApi({
	reducerPath: 'videoApi',
	baseQuery,
	/* tagTypes: ['User'], */
	endpoints: () => ({}),
});
