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
		id: '',
		verifiedEmail: false,
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
		},
		onLogout: (state, action: PayloadAction<string>) => {
			state.user = initialState.user;
			state.status = 'not-authenticated';
			state.errorMessage = action.payload;
		},
		onChecking: state => {
			state.status = 'checking';
		},
		onClearErrorMessage: state => {
			state.errorMessage = undefined;
		},
	},
});

export const { onLogin, onLogout } = authSlice.actions;
