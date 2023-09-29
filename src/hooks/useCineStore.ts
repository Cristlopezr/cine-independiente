import { onError, onSetMovieUploadSuccessMessage, setUploadProgress } from '@/store/cine';
import { useAppDispatch, useAppSelector } from './redux';

export const useCineStore = () => {
	const dispatch = useAppDispatch();
	const { uploadProgress, errorMessage, movieToUpload, movieUploadSuccessMessage } = useAppSelector(
		state => state.cine
	);

	const onErrorMessage = (error: string) => {
		dispatch(onError(error));
	};

	const onMovieUploadSuccesMessage = (message: string) => {
		dispatch(onSetMovieUploadSuccessMessage(message));
	};

	const onSetUploadProgress = (uploadProgress: number) => {
		dispatch(setUploadProgress(uploadProgress));
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
		onSetMovieUploadSuccessMessage,
	};
};
