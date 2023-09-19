import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
/* import type { RootState } from '../../store'; */

const initialState = {
	uploadProgress: 0,
	errorMessage: '',
	movieToUpload: {
		title: '',
		synopsis: '',
		productionYear: '',
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
