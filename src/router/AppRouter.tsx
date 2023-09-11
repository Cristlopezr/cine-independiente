import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '@/auth/routes';
import { CineRoutes } from '@/cine/routes';
import { useAuthStore } from '@/hooks';
import { useEffect } from 'react';

export const AppRouter = () => {
	const {
		status,
		user: { emailVerified },
		checkAuthToken,
	} = useAuthStore();

	useEffect(() => {
		//!Logout si no hay token
		checkAuthToken();
	}, []);

	if (status === 'checking') {
		return <h1>Cargando...</h1>;
	}

	return (
		<Routes>
			{status === 'authenticated' && emailVerified ? (
				<Route path='/*' element={<CineRoutes />} />
			) : (
				<Route path='/auth/*' element={<AuthRoutes />} />
			)}

			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
