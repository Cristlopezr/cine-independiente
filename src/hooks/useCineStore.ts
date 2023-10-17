import {
	onError,
	onSetIsGetUserListLoading,
	onSetMovieToUpload,
	onSetMovieUploadSuccessMessage,
	onSetUserList,
	onSetWatchHistory,
	setUploadProgress,
	useAddMovieToUserListMutation,
	useDeleteMovieFromUserListMutation,
	useLazyGetUserListQuery,
	useLazyGetWatchHistoryQuery,
} from '@/store/cine';
import { useAppDispatch, useAppSelector } from './redux';
import { Movie } from '@/interfaces';

export const useCineStore = () => {
	const dispatch = useAppDispatch();
	const {
		uploadProgress,
		errorMessage,
		movieToUpload,
		movieUploadSuccessMessage,
		watchHistory,
		userList,
		isGetUserListLoading,
	} = useAppSelector(state => state.cine);

	const [getWatchHistory] = useLazyGetWatchHistoryQuery();
	const [getUserList] = useLazyGetUserListQuery();
	const [addMovieToList] = useAddMovieToUserListMutation();
	const [deleteMovieFromList] = useDeleteMovieFromUserListMutation();

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
		const movieWatchHistory = watchHistory.find(
			singleWatchHistory => singleWatchHistory.movie_id === movie_id
		);

		if (!movieWatchHistory) {
			const newWatchHistory = [...watchHistory, { viewingTime, movie_id, user_id }];
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

	const startLoadingUserList = async (user_id: string) => {
		if (!user_id) return;
		dispatch(onSetIsGetUserListLoading(true));
		try {
			const { userList } = await getUserList(user_id).unwrap();
			dispatch(onSetUserList(userList));
			dispatch(onSetIsGetUserListLoading(false));
		} catch (error) {
			dispatch(onSetIsGetUserListLoading(false));
		}
	};

	const startAddingMovieTolist = async ({
		user_id,
		movie_id,
		movie,
	}: {
		user_id: string;
		movie_id: string;
		movie: Movie;
	}) => {
		const newUserList = [...userList, { user_id, movie_id, movie }];
		dispatch(onSetUserList(newUserList));
		await addMovieToList({ movie_id, user_id }).unwrap();
	};

	const startDeletingMovieFromList = async ({
		movie_id,
		user_id,
	}: {
		user_id: string;
		movie_id: string;
	}) => {
		const newUserList = userList.filter(movie => movie.movie_id !== movie_id);
		dispatch(onSetUserList(newUserList));
		await deleteMovieFromList({ movie_id, user_id });
	};

	return {
		//Propiedades
		uploadProgress,
		errorMessage,
		movieToUpload,
		movieUploadSuccessMessage,
		watchHistory,
		startLoadingWatchHistory,
		userList,
		isGetUserListLoading,

		//Metodos
		onErrorMessage,
		onSetUploadProgress,
		onMovieUploadSuccessMessage,
		onMovieToUpload,
		onSetViewingTime,
		startLoadingUserList,
		startAddingMovieTolist,
		startDeletingMovieFromList,
	};
};
