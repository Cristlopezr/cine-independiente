import { onError, onSetMovieToUpload, useUploadMovieMutation } from '@/store/cine';
import { useAppDispatch, useAppSelector } from './redux';

export const useCineStore = () => {
	const [uploadMovie, { isLoading: isUploadMovieLoading }] = useUploadMovieMutation();
	const dispatch = useAppDispatch();
	const { uploadProgress, errorMessage, movieToUpload } = useAppSelector(state => state.cine);

	const startUploadingMovie = async (movie: File) => {
		const formData = new FormData();
		formData.append('video', movie);

		try {
			await uploadMovie({ url: 'http://localhost:3000/api/video', data: formData });
		} catch (error: any) {
			console.log(error);
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
		uploadProgress,
		errorMessage,
		movieToUpload,

		//Metodos
		startUploadingMovie,
		startUploadingMovieInfo,
		onErrorMessage,
	};
};
