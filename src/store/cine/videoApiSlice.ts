import { videoApi } from '@/api';
import axios from 'axios';
import { onError, onSetMovieToUpload, onSetMovieUploadSuccessMessage, setUploadProgress } from './cineSlice';
import { onUpdateUser } from '../auth';

export const videoApiSlice = videoApi.injectEndpoints({
	endpoints: builder => ({
		uploadMovie: builder.mutation<{ msg: string }, { url: string; data: { movie: File,email:string }; date: string, abortController:AbortController }>({
			queryFn: async ({ url, data, date, abortController }, api) => {
				api.dispatch(onSetMovieToUpload({ date }));
				const formData = new FormData();
				formData.append('video', data.movie);
				formData.append('email', data.email);
				try {
					const result = await axios.post(url, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
						onUploadProgress: upload => {
							let movieUploadProgress = Math.round((100 * upload.loaded) / upload.total!);
							api.dispatch(setUploadProgress(movieUploadProgress));
						},
						signal: abortController.signal,
					});
					api.dispatch(onSetMovieUploadSuccessMessage(result.data));
					return { data: result.data };
				} catch (axiosError) {
					let err: any = axiosError;
					if (axios.isCancel(axiosError)) {
					/* 	console.log('La solicitud fue cancelada por el usuario', axiosError.message); */
						return {
							error: {
								status: err.respone?.status,
								data: err.response?.data || err.message,
							},
						};
					}
					api.dispatch(onError(err.response?.data?.msg || 'Hubo un error en la carga de la película, por favor inténtelo de nuevo más tarde.'));
					return {
						error: {
							status: err.respone?.status,
							data: err.response?.data || err.message,
						},
					};
				}
			},
		}),
		uploadMovieImage: builder.mutation<{ imageUrl: string },{ userId: string; image: File; date: string }>({
			query: data => {
				const formData = new FormData();
				formData.append('image', data.image);
				formData.append('date', data.date.toString());
				return { url: `/video/upload-image?id=${data.userId}`, method: 'POST', body: formData };
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(onSetMovieToUpload({ imageUrl: data.imageUrl }));
				} catch (error: any) {
					dispatch(onError(error?.msg));
				}
			},
		}),
		uploadProfileImage: builder.mutation<{ imageUrl: string },{ userId: string; image: File; }>({
			query: data => {
				const formData = new FormData();
				formData.append('image', data.image);
				return { url: `/user/upload-profile-image?id=${data.userId}`, method: 'PUT', body: formData };
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(onUpdateUser({ avatarUrl: data.imageUrl }));
				} catch (error: any) {
					console.log(error)
				}
			},
		}),
	}),
});

export const { useUploadMovieMutation, useUploadMovieImageMutation, useUploadProfileImageMutation } = videoApiSlice;
