import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, PasswordRecover, RegisterPage, ResetPassword, VerifyEmailPage } from '../pages';
import { useAuthStore } from '@/hooks';

export const AuthRoutes = () => {
	const {
		status,
		user: { emailVerified },
	} = useAuthStore();
	return (
		<Routes>
			{status === 'authenticated' && !emailVerified ? (
				<>
					<Route path='/verify-email' element={<VerifyEmailPage />} />
					<Route path='/*' element={<Navigate to='/auth/verify-email' />} />
				</>
			) : (
				<>
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
				</>
			)}
			<Route path='password-recover' element={<PasswordRecover />} />
			<Route path='reset-password' element={<ResetPassword />} />
			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
