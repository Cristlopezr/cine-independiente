import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
/* import type { RootState } from '../../store'; */
import { User } from '@/interfaces';

type status = 'authenticated' | 'not-authenticated' | 'checking';

interface AuthState {
	status: status;
	user: User;
	errorMessage: undefined | string;
}

const initialState: AuthState = {
	status: 'checking',
	user: {
		name: '',
		email: '',
		lastname: '',
		user_id: '',
		emailVerified: false,
		avatarUrl: '',
	},
	errorMessage: undefined,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		onLogin: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.status = 'authenticated';
			state.errorMessage = undefined;
		},
		onLogout: state => {
			state.user = initialState.user;
			state.status = 'not-authenticated';
		},
		onChecking: state => {
			state.status = 'checking';
		},
		onClearErrorMessage: state => {
			state.errorMessage = undefined;
		},
		onError: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload;
		},
		onUpdateUser: (state, action) => {
			state.user = { ...state.user, ...action.payload };
		},
	},
});

export const { onLogin, onLogout, onError, onUpdateUser } = authSlice.actions;
