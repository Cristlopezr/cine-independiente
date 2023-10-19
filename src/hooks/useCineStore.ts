import {
	onError,
	onSetMovieToUpload,
	onSetMovieUploadSuccessMessage,
	onSetUserList,
	onSetUserListLoading,
	onSetWatchHistory,
	onSetWatchHistoryLoading,
	setUploadProgress,
	useAddMovieToUserListMutation,
	useDeleteMovieFromUserListMutation,
	useDeleteMovieFromWatchHistoryMutation,
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
		isGetWatchHistoryLoading,
	} = useAppSelector(state => state.cine);

	const [getWatchHistory] = useLazyGetWatchHistoryQuery();
	const [getUserList] = useLazyGetUserListQuery();
	const [addMovieToList] = useAddMovieToUserListMutation();
	const [deleteMovieFromList] = useDeleteMovieFromUserListMutation();
	const [deleteMovieFromWatchHistory] = useDeleteMovieFromWatchHistoryMutation();

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
		dispatch(onSetWatchHistoryLoading(true));
		try {
			const { watchHistory } = await getWatchHistory(user_id).unwrap();
			dispatch(onSetWatchHistory(watchHistory));
		} catch (error) {
			dispatch(onSetWatchHistoryLoading(false));
		}
	};

	const onSetViewingTime = (viewingTime: number, movie: Movie, user_id: string) => {
		const movieWatchHistory = watchHistory.find(
			singleWatchHistory => singleWatchHistory.movie_id === movie.movie_id
		);

		if (!movieWatchHistory) {
			const newWatchHistory = [
				...watchHistory,
				{ viewingTime, movie_id: movie.movie_id, user_id, movie },
			];
			dispatch(onSetWatchHistory(newWatchHistory));
			return;
		}

		const newWatchHistory = watchHistory?.map(singleWatchHistory => {
			if (singleWatchHistory.movie_id === movie.movie_id) {
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

	const startDeletingFromWatchHistory = async ({
		movie_id,
		user_id,
	}: {
		user_id: string;
		movie_id: string;
	}) => {
		const newWatchHistory = watchHistory.filter(movie => movie.movie_id !== movie_id);
		dispatch(onSetWatchHistory(newWatchHistory));
		await deleteMovieFromWatchHistory({ movie_id, user_id });
	};

	const onDeleteUserWatchHistory = () => {
		dispatch(onSetWatchHistory([]));
	};

	const startLoadingUserList = async (user_id: string) => {
		if (!user_id) return;
		dispatch(onSetUserListLoading(true));
		try {
			const { userList } = await getUserList(user_id).unwrap();
			dispatch(onSetUserList(userList));
		} catch (error) {
			dispatch(onSetUserListLoading(false));
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

	const onDeleteUserList = () => {
		dispatch(onSetUserList([]));
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
		isGetWatchHistoryLoading,

		//Metodos
		onErrorMessage,
		onSetUploadProgress,
		onMovieUploadSuccessMessage,
		onMovieToUpload,
		onSetViewingTime,
		startLoadingUserList,
		startAddingMovieTolist,
		startDeletingMovieFromList,
		onDeleteUserList,
		onDeleteUserWatchHistory,
		startDeletingFromWatchHistory,
	};
};
