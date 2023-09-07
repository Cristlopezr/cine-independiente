import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '@/auth/routes';
import { CineRoutes } from '@/cine/routes';

export const AppRouter = () => {
	const state: string = 'not-authenticated';

	return (
		<Routes>
			{state === 'authenticated' ? (
				<Route path='/*' element={<CineRoutes />} />
			) : (
				<Route path='/auth/*' element={<AuthRoutes />} />
			)}

			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
