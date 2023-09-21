import {
	useRegisterUserMutation,
	useRequestVerificationCodeMutation,
	useCheckVerificationCodeMutation,
	useLoginUserMutation,
	useLazyRefreshTokenQuery,
} from '@/store/auth';
import { useAppDispatch, useAppSelector } from './redux';
import { onError, onLogin, onLogout } from '@/store/auth';

export const useAuthStore = () => {
	const dispatch = useAppDispatch();
	const { status, user, errorMessage } = useAppSelector(state => state.auth);
	const [registerUser, { isLoading: isRegisterLoading }] = useRegisterUserMutation();
	const [requestVerificationCode, { isLoading: isRequestCodeLoading }] =
		useRequestVerificationCodeMutation();
	const [checkVerificationCode, { isLoading: isCheckCodeLoading }] = useCheckVerificationCodeMutation();
	const [refreshToken] = useLazyRefreshTokenQuery();

	const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();

	const startLogin = async ({ email, password }: { email: string; password: string }) => {
		try {
			const { user, token } = await loginUser({ email, password }).unwrap();
			saveTokenInLocalStorage(token);
			dispatch(onLogin(user));
		} catch (error: any) {
			dispatch(onError(error.data.msg));
			dispatch(onLogout());
		}
	};

	const startRegister = async (userData: {
		name: string;
		lastname: string;
		email: string;
		password: string;
	}) => {
		try {
			const { user, token } = await registerUser(userData).unwrap();
			saveTokenInLocalStorage(token);
			dispatch(onLogin(user));
		} catch (error) {
			dispatch(onLogout());
		}
	};

	const startRequestVerificationCode = async ({ email }: { email: string }) => {
		try {
			await requestVerificationCode({ email });
		} catch (error) {
			console.log(error);
		}
	};

	const startVerifyEmail = async ({ email, code }: { email: string; code: string }) => {
		try {
			const { user, token } = await checkVerificationCode({
				email,
				verificationCode: Number(code),
			}).unwrap();
			saveTokenInLocalStorage(token);
			dispatch(onLogin(user));
		} catch (error: any) {
			dispatch(onError(error.data.msg));
		}
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token');
		if (!token) return dispatch(onLogout());

		try {
			const { user, token } = await refreshToken().unwrap();
			saveTokenInLocalStorage(token);
			dispatch(onLogin(user));
		} catch (error) {
			localStorage.removeItem('token');
			localStorage.removeItem('token-init-date');
			dispatch(onLogout());
		}
	};

	const startLogout = () => {
		console.log('Borrando token');
		localStorage.removeItem('token');
		localStorage.removeItem('token-init-date');
		dispatch(onLogout());
	};

	const saveTokenInLocalStorage = (token: string) => {
		localStorage.setItem('token', token);
		localStorage.setItem('token-init-date', new Date().getTime().toString());
	};

	return {
		//Propiedades
		status,
		user,
		errorMessage,
		isLoginLoading,
		isRegisterLoading,
		isRequestCodeLoading,
		isCheckCodeLoading,
		//Metodos
		startLogin,
		startRegister,
		startVerifyEmail,
		startRequestVerificationCode,
		checkAuthToken,
		startLogout,
	};
};
