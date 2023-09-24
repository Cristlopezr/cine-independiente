import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_MOVIE_BASE_URL;

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

export const videoApi = createApi({
	reducerPath: 'videoApi',
	baseQuery,
	/* tagTypes: ['User'], */
	endpoints: () => ({}),
});
