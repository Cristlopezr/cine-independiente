import { Routes, Route, Navigate } from 'react-router-dom';
import { CinePage, MoviePage, SearchPage, VideoPage } from '../pages';
import { MovieDetailsPage, MyMoviesPage, ProfilePage } from '../pages/user';
import { ScrollToTop } from '@/components';

export const CineRoutes = () => {
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<CinePage />} />
				<Route path='/*' element={<Navigate to='/' />} />
				<Route path='/my-movies' element={<MyMoviesPage />} />
				<Route path='/movie/:id' element={<MoviePage />} />
				<Route path='/movie/player/:id' element={<VideoPage />} />
				<Route path='/search' element={<SearchPage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/my-movies/:id' element={<MovieDetailsPage />} />
			</Routes>
		</>
	);
};
