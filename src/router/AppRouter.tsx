import { AuthRoutes } from '@/auth/routes';
import { CineRoutes } from '@/cine/routes';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
	const status: string = 'not-authenticated';

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