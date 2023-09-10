import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage, VerifyEmailPage } from '../pages';
import { useAppSelector } from '@/hooks/redux';

export const AuthRoutes = () => {
	const { status, user:{emailVerified} } = useAppSelector(state => state.auth);
	return (
		<Routes>
			{status === 'authenticated' && !emailVerified ? (
				<>
					<Route path='/verifyemail' element={<VerifyEmailPage />} />
					<Route path='/*' element={<Navigate to='/auth/verifyemail' />} />
				</>
			) : (
				<>
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />
				</>
			)}
			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
