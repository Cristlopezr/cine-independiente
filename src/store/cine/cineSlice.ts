import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
/* import type { RootState } from '../../store'; */
interface CineState {
	uploadProgress: number;
	errorMessage: string | undefined;
	movieToUpload: {
		date: number | undefined;
		imageUrl: string | undefined;
	};
}

const initialState: CineState = {
	uploadProgress: 0,
	errorMessage: '',
	movieToUpload: {
		date: undefined,
		imageUrl: undefined,
	},
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
	},
});

export const { setUploadProgress, onError, onSetMovieToUpload } = cineSlice.actions;
