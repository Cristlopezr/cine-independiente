import { Routes, Route, Navigate } from 'react-router-dom';
import { CinePage, MoviePage, SearchPage, VideoPage } from '../pages';
import { MyMoviesPage } from '../pages/user';

export const CineRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<CinePage />} />
			<Route path='/*' element={<Navigate to='/' />} />
			<Route path='/my-movies' element={<MyMoviesPage />} />
			<Route path='/movie/:id' element={<MoviePage />} />
			<Route path='/movie/player/:id' element={<VideoPage />} />
			<Route path='/search' element={<SearchPage />} />
		</Routes>
	);
};
