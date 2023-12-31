import { Genre } from '@/interfaces';
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
	},
});

export const { setUploadProgress, onError, onSetMovieToUpload, onGetGenres, onSetMovieUploadSuccessMessage } =
	cineSlice.actions;
