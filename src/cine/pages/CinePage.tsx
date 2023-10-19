import { useGetGenresWithMoviesQuery } from '@/store/cine';
import { CineLayout } from '../layout';
import { MainCarousel, MovieCarousel, settings169 } from '@/components/cine/carousel';
import React from 'react';
import { Skeleton } from '@/components/ui';
import Slider from 'react-slick';
import { useCineStore } from '@/hooks';
import { useNavigate } from 'react-router-dom';

const skeletons = Array.from({ length: 5 });

export const CinePage = () => {
	const {
		data: genresWithMovies,
		isError,
		isFetching,
	} = useGetGenresWithMoviesQuery({ take: '20', skip: '' });
	const { userList, watchHistory } = useCineStore();
	const navigate = useNavigate();

	const watchHistoryMovies = watchHistory.map(singleWatchHistory => singleWatchHistory.movie);

	const userListMovies = userList.map(item => item.movie);

	if (isError) {
		return (
			<CineLayout headerTransparent>
				<MainCarousel />
				<section className='pt-10 flex text-xl sm:text-2xl items-center justify-center px-5 lg:px-12'>
					<div>Ha ocurrido un error al obtener las películas.</div>
				</section>
			</CineLayout>
		);
	}

	if (isFetching) {
		return (
			<CineLayout headerTransparent>
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
			</CineLayout>
		);
	}

	const onClickClickableCarousel = (path: string) => {
		navigate(path);
	};
	return (
		<CineLayout headerTransparent>
			<MainCarousel />
			<section className='mt-5 flex flex-col gap-16 px-5 lg:px-12'>
				{watchHistoryMovies.length > 0 && (
					<MovieCarousel
						clickable
						onClick={() => onClickClickableCarousel('/my-history')}
						movies={watchHistoryMovies}
						title='Continuar viendo'
						aspect='aspect-[16/9]'
						settings={settings169}
					/>
				)}
				{userListMovies.length > 0 && (
					<MovieCarousel
						onClick={() => onClickClickableCarousel('/my-list')}
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
		</CineLayout>
	);
};
