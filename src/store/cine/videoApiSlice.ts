import { videoApi } from '@/api';
import axios from 'axios';
import { setUploadProgress } from './cineSlice';
export const abortController = new AbortController();
export const videoApiSlice = videoApi.injectEndpoints({
	endpoints: builder => ({
		uploadMovie: builder.mutation<void, { url: string; data: FormData }>({
			queryFn: async ({ url, data }, api) => {
				try {
					const result = await axios.post(url, data, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
						onUploadProgress: upload => {
							let uploadProgress = Math.round((100 * upload.loaded) / upload.total!);
							api.dispatch(setUploadProgress(uploadProgress));
						},
						signal: abortController.signal,
					});
					return { data: result.data };
				} catch (axiosError) {
					let err: any = axiosError;
					if (axios.isCancel(axiosError)) {
						console.log('La solicitud fue cancelada por el usuario', axiosError.message);
					}
					return {
						error: {
							status: err.respone?.status,
							data: err.response?.data || err.message,
						},
					};
				}
			},
		}),
	}),
});

export const { useUploadMovieMutation } = videoApiSlice;
