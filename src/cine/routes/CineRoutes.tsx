import { Routes, Route, Navigate } from 'react-router-dom';
import { CinePage } from '../pages';

export const CineRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<CinePage />} />
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
