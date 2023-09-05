import { Routes, Route, Navigate } from 'react-router-dom';

export const AuthRoutes = () => {
	return (
		<Routes>
			<Route path='login' element={<h1>Login</h1>} />
			<Route path='register' element={<h1>Register</h1>} />
			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};