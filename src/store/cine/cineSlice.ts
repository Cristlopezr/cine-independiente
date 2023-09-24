import { Genre } from '@/interfaces';
import { createSlice } from '@reduxjs/toolkit';
/* import type { PayloadAction } from '@reduxjs/toolkit'; */
/* import type { RootState } from '../../store'; */
interface CineState {
	uploadProgress: number;
	isCreateResolutionsLoading: boolean;
	errorMessage: string | undefined;
	movieToUpload: {
		date: number | undefined;
		imageUrl: string | undefined;
	};
	genres: Genre[];
}

const initialState: CineState = {
	uploadProgress: 0,
	isCreateResolutionsLoading: false,
	errorMessage: '',
	movieToUpload: {
		date: undefined,
		imageUrl: undefined,
	},
	genres: [],
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
		onSetIsCreateResolutionsLoading: (state, action) => {
			state.isCreateResolutionsLoading = action.payload;
		},
	},
});

export const {
	setUploadProgress,
	onError,
	onSetMovieToUpload,
	onGetGenres,
	onSetIsCreateResolutionsLoading,
} = cineSlice.actions;
