import { onError, setUploadProgress } from '@/store/cine';
import { useAppDispatch, useAppSelector } from './redux';

export const useCineStore = () => {
	const dispatch = useAppDispatch();
	const { uploadProgress, errorMessage, movieToUpload } = useAppSelector(state => state.cine);

	const onErrorMessage = (error: string) => {
		dispatch(onError(error));
	};

	const onSetUploadProgress = (uploadProgress: number) => {
		dispatch(setUploadProgress(uploadProgress));
	};

	return {
		//Propiedades
		uploadProgress,
		errorMessage,
		movieToUpload,

		//Metodos
		onErrorMessage,
		onSetUploadProgress,
	};
};
