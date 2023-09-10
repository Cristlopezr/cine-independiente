import {
	useRegisterUserMutation,
	useRequestVerificationCodeMutation,
	useCheckVerificationCodeMutation,
} from '@/api';
import { useAppDispatch } from './redux';
import { onLogin, onLogout } from '@/store/auth';

export const useAuthStore = () => {
	const dispatch = useAppDispatch();
	const [registerUser, { isLoading: isRegisterLoading }] = useRegisterUserMutation();
	const [requestVerificationCode, { isLoading: isRequestCodeLoading }] =
		useRequestVerificationCodeMutation();
	const [checkVerificationCode] = useCheckVerificationCodeMutation();

	const startRegister = async (userData: {
		name: string;
		lastname: string;
		email: string;
		password: string;
	}) => {
		try {
			await registerUser(userData);
		} catch (error) {
			console.log(error);
			/* dispatch(onLogout(error)) */
		}
	};

	const startRequestVerificationCode = async ({ email }: { email: string }) => {
		try {
			const code = await requestVerificationCode({ email }).unwrap();
			return code;
		} catch (error) {
			console.log(error);
		}
	};

	const startVerifyEmail = async ({ email, code }: { email: string; code: string }) => {
		try {
			const user = await checkVerificationCode({ email, code: Number(code) }).unwrap();
			dispatch(onLogin(user));
		} catch (error) {
			console.log(error);
			/* dispatch(onLogout(error)) */
		}
	};

	return {
		startRegister,
		startVerifyEmail,
		isRegisterLoading,
		isRequestCodeLoading,
		startRequestVerificationCode,
	};
};
