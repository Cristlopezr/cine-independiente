import { Routes, Route, Navigate } from 'react-router-dom';
import { CinePage, MoviePage, MoviesPage, Room, SearchPage, VideoPage } from '../pages';
import { MovieDetailsPage, MyHistoryPage, MyListPage, MyMoviesPage, ProfilePage } from '../pages/user';
import { ScrollToTop } from '@/components';
import { CineLayout } from '../layout';

export const CineRoutes = () => {
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<CineLayout headerTransparent />}>
					<Route index element={<CinePage />} />
					<Route path='movie/:id' element={<MoviePage />} />
				</Route>
				<Route path='room/:movie_id/:room_id' element={<Room />} />
				<Route path='/movie/player/:id' element={<VideoPage />} />
				<Route path='/user' element={<CineLayout />}>
					<Route path='my-movies' element={<MyMoviesPage />} />
					<Route path='profile' element={<ProfilePage />} />
					<Route path='my-movies/:id/:user_id' element={<MovieDetailsPage />} />
					<Route path='my-list' element={<MyListPage />} />
					<Route path='my-history' element={<MyHistoryPage />} />
				</Route>
				<Route path='/cine' element={<CineLayout />}>
					<Route path='search' element={<SearchPage />} />
					<Route path='movies' element={<MoviesPage />} />
				</Route>
				<Route path='/*' element={<Navigate to='/' />} />
			</Routes>
		</>
	);
};
