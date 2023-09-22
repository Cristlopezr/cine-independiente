import {
	onError,
	onSetMovieToUpload,
	useUploadMovieImageMutation,
	useUploadMovieMutation,
} from '@/store/cine';
import { useAppDispatch, useAppSelector } from './redux';

export const useCineStore = () => {
	const [uploadMovie, { isLoading: isUploadMovieLoading }] = useUploadMovieMutation();
	const [uploadMovieImage, { isLoading: isUploadMovieImageLoading }] = useUploadMovieImageMutation();
	const dispatch = useAppDispatch();
	const { uploadProgress, errorMessage, movieToUpload } = useAppSelector(state => state.cine);

	const startUploadingMovie = async (movie: File, { userId, email }: { userId: string; email: string }) => {
		const date = new Date().getTime();
		dispatch(onSetMovieToUpload({ date }));
		const formData = new FormData();
		formData.append('video', movie);
		formData.append('email', email);

		try {
			await uploadMovie({
				url: `http://localhost:3000/api/video?id=${userId}`,
				data: formData,
			});
		} catch (error: any) {
			console.log(error);
			dispatch(onError(error?.msg));
		}
	};

	const startUploadingMovieImage = async (image: File, userId: string) => {
		const formData = new FormData();
		formData.append('image', image);
		formData.append('date', movieToUpload.date?.toString()!);

		try {
			const imageUrl = await uploadMovieImage({ userId, data: formData }).unwrap();
			dispatch(onSetMovieToUpload({ imageUrl }));
		} catch (error: any) {
			dispatch(onError(error?.msg));
		}
	};

	const startUploadingMovieInfo = (data: any) => {
		console.log(data);
		const { image, ...stateData } = data;
		console.log(stateData);
		dispatch(onSetMovieToUpload(data));
		/* const formData = new FormData();
		for (const key in data) {
			formData.append(key, data[key]);
		}

		try {
			
		} catch (error) {
			
		} */
	};

	/* const startUploadMovieInfo = async(data) => {
		const formData = new FormData();
		for (const key in data) {
			formData.append(key, data[key]);
		}

		try {
			
		} catch (error) {
			
		}
	}; */

	const onErrorMessage = (error: string) => {
		dispatch(onError(error));
	};

	return {
		//Propiedades
		isUploadMovieLoading,
		isUploadMovieImageLoading,
		uploadProgress,
		errorMessage,
		movieToUpload,

		//Metodos
		startUploadingMovie,
		startUploadingMovieInfo,
		onErrorMessage,
		startUploadingMovieImage,
	};
};
