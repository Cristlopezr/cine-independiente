import { videoApi } from '@/api';
import axios from 'axios';
import { onError, onSetMovieToUpload, setUploadProgress } from './cineSlice';
export const abortController = new AbortController();
export const videoApiSlice = videoApi.injectEndpoints({
	endpoints: builder => ({
		uploadMovie: builder.mutation<{ data: { inputPath: string }; msg: string },{ url: string; data: { movie: File }; date: string }>({
			queryFn: async ({ url, data, date }, api) => {
				api.dispatch(onSetMovieToUpload({ date }));
				const formData = new FormData();
				formData.append('video', data.movie);
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
					return { data: result.data };
				} catch (axiosError) {
					let err: any = axiosError;
					if (axios.isCancel(axiosError)) {
						console.log('La solicitud fue cancelada por el usuario', axiosError.message);
					}
					api.dispatch(onError(err.response?.data || err.message));
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
	}),
});

export const { useUploadMovieMutation, useUploadMovieImageMutation } =
	videoApiSlice;
