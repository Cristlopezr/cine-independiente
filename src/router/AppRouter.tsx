import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '@/auth/routes';
import { CineRoutes } from '@/cine/routes';
import { useAuthStore, useCineStore } from '@/hooks';
import { useEffect } from 'react';
import { Loading } from '@/components/ui';

export const AppRouter = () => {
	const {
		status,
		user: { emailVerified, user_id },
		checkAuthToken,
	} = useAuthStore();
	const { startLoadingWatchHistory, startLoadingUserList } = useCineStore();

	useEffect(() => {
		//!Logout si no hay token
		checkAuthToken();
	}, []);

	useEffect(() => {
		startLoadingWatchHistory(user_id);
		startLoadingUserList(user_id);
	}, [user_id]);

	if (status === 'checking') {
		return (
			<div className='mt-40'>
				<Loading />
			</div>
		);
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
