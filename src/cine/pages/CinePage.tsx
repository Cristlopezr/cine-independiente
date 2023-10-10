import { useGetGenresWithMoviesQuery } from '@/store/cine';
import { CineLayout } from '../layout';
import { MainCarousel, MovieCarousel, settings169 } from '@/components/cine/carousel';
import React from 'react';

/* const skeletons = Array.from({ length: 8 }); */

export const CinePage = () => {
	const { data: genresWithMovies /* isError, isFetching */ } = useGetGenresWithMoviesQuery();

	return (
		<CineLayout>
			<MainCarousel />
			<section className='mt-5 flex flex-col gap-5 px-5 lg:px-12'>
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
