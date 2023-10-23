import { Genre, UserList, WatchHistory } from '@/interfaces';
import { createSlice } from '@reduxjs/toolkit';
/* import type { PayloadAction } from '@reduxjs/toolkit'; */
/* import type { RootState } from '../../store'; */
interface CineState {
	uploadProgress: number;
	errorMessage: string | undefined;
	movieUploadSuccessMessage: string;
	movieToUpload: {
		id: string | undefined;
		date: string | undefined;
		imageUrl: string | undefined;
	};
	genres: Genre[];
	watchHistory: WatchHistory[];
	userList: UserList[];
	isGetUserListLoading: boolean;
	isGetWatchHistoryLoading: boolean;
}

const initialState: CineState = {
	uploadProgress: 0,
	errorMessage: '',
	movieUploadSuccessMessage: '',
	movieToUpload: {
		id: undefined,
		date: undefined,
		imageUrl: undefined,
	},
	genres: [],
	watchHistory: [],
	userList: [],
	isGetUserListLoading: false,
	isGetWatchHistoryLoading: false,
};

export const cineSlice = createSlice({
	name: 'cine',
	initialState,
	reducers: {
		setUploadProgress: (state, action) => {
			state.uploadProgress = action.payload;
		},
		onError: (state, action) => {
			state.errorMessage = action.payload;
		},
		onSetMovieToUpload: (state, action) => {
			state.movieToUpload = { ...state.movieToUpload, ...action.payload };
		},
		onGetGenres: (state, action) => {
			state.genres = action.payload;
		},
		onSetMovieUploadSuccessMessage: (state, action) => {
			state.movieUploadSuccessMessage = action.payload;
		},
		onSetWatchHistory: (state, action) => {
			state.watchHistory = action.payload;
			state.isGetWatchHistoryLoading = false;
		},
		onSetUserList: (state, action) => {
			state.userList = action.payload;
			state.isGetUserListLoading = false;
		},
		onSetUserListLoading: (state, action) => {
			state.isGetUserListLoading = action.payload;
		},
		onSetWatchHistoryLoading: (state, action) => {
			state.isGetWatchHistoryLoading = action.payload;
		},
	},
});

export const {
	setUploadProgress,
	onError,
	onSetMovieToUpload,
	onGetGenres,
	onSetMovieUploadSuccessMessage,
	onSetWatchHistory,
	onSetUserList,
	onSetUserListLoading,
	onSetWatchHistoryLoading,
} = cineSlice.actions;
