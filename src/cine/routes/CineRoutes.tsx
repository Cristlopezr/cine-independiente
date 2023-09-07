import { Routes, Route, Navigate } from 'react-router-dom';
export const CineRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<>
						<h1></h1>
						<button>Salir</button>
					</>
				}
			/>
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
