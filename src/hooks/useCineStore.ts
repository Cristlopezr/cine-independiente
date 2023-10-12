import {
	onError,
	onSetMovieToUpload,
	onSetMovieUploadSuccessMessage,
	onSetWatchHistory,
	setUploadProgress,
	useLazyGetWatchHistoryQuery,
} from '@/store/cine';
import { useAppDispatch, useAppSelector } from './redux';

export const useCineStore = () => {
	const dispatch = useAppDispatch();
	const { uploadProgress, errorMessage, movieToUpload, movieUploadSuccessMessage, watchHistory } =
		useAppSelector(state => state.cine);

	const [getWatchHistory] = useLazyGetWatchHistoryQuery();

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

	const startLoadingWatchHistory = async (user_id: string) => {
		if (!user_id) return;
		try {
			const { watchHistory } = await getWatchHistory(user_id).unwrap();
			dispatch(onSetWatchHistory(watchHistory));
		} catch (error) {}
	};
	const onSetViewingTime = (viewingTime: number, movie_id: string, user_id: string) => {
		if (watchHistory.length === 0) {
			const newWatchHistory = [{ viewingTime, movie_id, user_id }];
			dispatch(onSetWatchHistory(newWatchHistory));
			return;
		}

		const newWatchHistory = watchHistory?.map(singleWatchHistory => {
			if (singleWatchHistory.movie_id === movie_id) {
				const newSingleHistory = {
					...singleWatchHistory,
					viewingTime: viewingTime,
				};
				return newSingleHistory;
			}
			return singleWatchHistory;
		});
		dispatch(onSetWatchHistory(newWatchHistory));
	};

	return {
		//Propiedades
		uploadProgress,
		errorMessage,
		movieToUpload,
		movieUploadSuccessMessage,
		watchHistory,
		startLoadingWatchHistory,

		//Metodos
		onErrorMessage,
		onSetUploadProgress,
		onMovieUploadSuccessMessage,
		onMovieToUpload,
		onSetViewingTime,
	};
};
