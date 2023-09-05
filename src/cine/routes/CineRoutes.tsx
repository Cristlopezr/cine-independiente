import { Routes, Route, Navigate } from 'react-router-dom';
export const CineRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<h1>Cine</h1>} />
            <Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};