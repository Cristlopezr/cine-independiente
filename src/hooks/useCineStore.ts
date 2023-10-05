import { onError, onSetMovieToUpload, onSetMovieUploadSuccessMessage, setUploadProgress } from '@/store/cine';
import { useAppDispatch, useAppSelector } from './redux';

export const useCineStore = () => {
	const dispatch = useAppDispatch();
	const { uploadProgress, errorMessage, movieToUpload, movieUploadSuccessMessage } = useAppSelector(
		state => state.cine
	);

	const onErrorMessage = (error: string) => {
		dispatch(onError(error));
	};

	const onMovieUploadSuccessMessage = (message: string) => {
		dispatch(onSetMovieUploadSuccessMessage(message));
	};

	const onSetUploadProgress = (uploadProgress: number) => {
		dispatch(setUploadProgress(uploadProgress));
	};

	const onMovieToUpload = (data: string) => {
		dispatch(onSetMovieToUpload({ id: data }));
	};

	return {
		//Propiedades
		uploadProgress,
		errorMessage,
		movieToUpload,
		movieUploadSuccessMessage,

		//Metodos
		onErrorMessage,
		onSetUploadProgress,
		onMovieUploadSuccessMessage,
		onMovieToUpload,
	};
};
