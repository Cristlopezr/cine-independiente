import {
	useGetGenresWithMoviesQuery,
	useGetRecommendedMoviesQuery,
	useGetUserListQuery,
	useGetWatchHistoryQuery,
} from '@/store/cine';
import { MainCarousel, MovieCarousel, settings169 } from '@/components/cine/carousel';
import React from 'react';
import { Skeleton } from '@/components/ui';
import Slider from 'react-slick';
import { useAuthStore } from '@/hooks';
import { useNavigate } from 'react-router-dom';

const skeletons = Array.from({ length: 5 });

export const CinePage = () => {
	const {
		data: genresWithMovies,
		isError,
		isFetching,
	} = useGetGenresWithMoviesQuery({ take: '20', skip: '' });
	const { user } = useAuthStore();
	const { data: recommendedMoviesData, isFetching: isRecommendedMoviesFetching } =
		useGetRecommendedMoviesQuery(user.user_id);
	const { data: watchHistoryData, isFetching: isWatchHistoryFetching } = useGetWatchHistoryQuery(
		user.user_id
	);

	const { data: userListData, isFetching: isUserListFetching } = useGetUserListQuery(user.user_id);
	const navigate = useNavigate();

	const userListMovies = userListData?.userList.map(item => item.movie);
	const watchHistoryMovies = watchHistoryData?.watchHistory.map(
		singleWatchHistory => singleWatchHistory.movie
	);

	const recommendedMovies = recommendedMoviesData?.recommendedMovies;

	if (isError) {
		return (
			<div>
				<MainCarousel />
				<section className='pt-10 flex text-xl sm:text-2xl items-center justify-center px-5 lg:px-12'>
					<div>Ha ocurrido un error al obtener las películas.</div>
				</section>
			</div>
		);
	}

	if (isFetching || isRecommendedMoviesFetching || isWatchHistoryFetching || isUserListFetching) {
		return (
			<div>
				<MainCarousel />
				<section className='mt-5 flex flex-col gap-5 px-5 lg:px-12'>
					{skeletons.map((_, i) => (
						<React.Fragment key={i}>
							<div className='h-1'></div>
							<Slider {...settings169}>
								{skeletons.map((_, i) => (
									<div key={i} className='px-[8px] '>
										<Skeleton className='aspect-[16/9]' />
									</div>
								))}
							</Slider>
						</React.Fragment>
					))}
				</section>
			</div>
		);
	}

	const onClickClickableCarousel = (path: string) => {
		navigate(path);
	};
	return (
		<div>
			<MainCarousel />
			<section className='mt-5 flex flex-col gap-10 px-5 lg:px-12'>
				{recommendedMovies && recommendedMovies.length > 0 && (
					<MovieCarousel
						movies={recommendedMovies}
						title='Nuestra selección para ti'
						aspect='aspect-[16/9]'
						settings={settings169}
					/>
				)}
				{watchHistoryMovies && watchHistoryMovies.length > 0 && (
					<MovieCarousel
						clickable
						onClick={() => onClickClickableCarousel('/user/my-history')}
						movies={watchHistoryMovies}
						title='Continuar viendo'
						aspect='aspect-[16/9]'
						settings={settings169}
					/>
				)}
				{userListMovies && userListMovies.length > 0 && (
					<MovieCarousel
						onClick={() => onClickClickableCarousel('/user/my-list')}
						clickable
						movies={userListMovies}
						title='Mi lista'
						aspect='aspect-[16/9]'
						settings={settings169}
					/>
				)}
				{genresWithMovies?.map(({ name, genre_id, movies }) => {
					if (movies.length === 0) return null;
					return (
						<React.Fragment key={genre_id}>
							<MovieCarousel
								movies={movies}
								title={name}
								aspect='aspect-[16/9]'
								settings={settings169}
							/>
						</React.Fragment>
					);
				})}
			</section>
		</div>
	);
};
