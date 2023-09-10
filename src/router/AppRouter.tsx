import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '@/auth/routes';
import { CineRoutes } from '@/cine/routes';
import { useAppSelector } from '@/hooks/redux';

export const AppRouter = () => {
	const { status } = useAppSelector(state => state.auth);

	return (
		<Routes>
			{status === 'authenticated' ? (
				<Route path='/*' element={<CineRoutes />} />
			) : (
				<Route path='/auth/*' element={<AuthRoutes />} />
			)}

			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
