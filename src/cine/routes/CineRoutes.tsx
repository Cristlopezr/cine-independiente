import { useAppSelector } from '@/hooks/redux';
import { Routes, Route, Navigate } from 'react-router-dom';
export const CineRoutes = () => {

	const {user} = useAppSelector(state => state.auth)
	return (
		<Routes>
			<Route
				path='/'
				element={
					<>
						<h1>{user.name}</h1>
						<button>Salir</button>
					</>
				}
			/>
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
