import { Loading, Separator } from '@/components/ui';
import React, { useState } from 'react';
import { MovieCarouselItem, settingsGenre } from '@/components/cine/carousel';
import { useGetGenresWithMoviesQuery, useGetMoviesQuery } from '@/store/cine';
import Slider from 'react-slick';

export const MoviesPage = () => {
	const [query, setQuery] = useState('');
	const { data: genres } = useGetGenresWithMoviesQuery({ take: '', skip: '' });
	const { data: movies, isFetching, isError, error } = useGetMoviesQuery({ skip: '', take: '', query });

	const onChangeQuery = (genre: string) => {
		setQuery(genre);
	};

	return (
		<div className='mt-[100px] px-5 sm:px-10'>
			<div>
				<h1 className='text-2xl sm:px-5 font-semibold'>
					{query ? `Películas de ${query}` : 'Películas'}
				</h1>
			</div>
			<Separator className='my-5' />
			<Slider {...settingsGenre}>
				<div
					className='rounded-full border px-3 py-1 font-semibold'
					onClick={() => onChangeQuery('')}
				>
					Todas
				</div>
				{genres?.map(genre => {
					if (genre.movies.length === 0) return null;
					return (
						<div
							className='rounded-full border px-3 py-1 font-semibold'
							onClick={() => onChangeQuery(genre.name)}
						>
							{genre.name}
						</div>
					);
				})}
			</Slider>
			<div className='flex items-center'></div>
			{isFetching ? (
				<div className='flex items-center justify-center mt-20'>
					<Loading />
				</div>
			) : (
				<>
					{isError && error && 'status' in error && error.status === 404 ? (
						<NotFound />
					) : (
						<>
							{isError ? (
								<Error />
							) : (
								<div className='mt-10 grid grid-cols-2 gap-y-5 gap-x-3 min-[677px]:grid-cols-3 min-[1177px]:grid-cols-4 min-[1500px]:grid-cols-5'>
									{movies?.map(movie => (
										<React.Fragment key={movie.movie_id}>
											<MovieCarouselItem
												key={movie.movie_id}
												movie={movie}
												className='aspect-[16/9]'
											/>
										</React.Fragment>
									))}
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};

const NotFound = () => {
	return (
		<div className='pt-10 text-xl text-center flex flex-col gap-3'>
			<p>No se encontraron películas que coincidan con la búsqueda.</p>
			<p>Puedes buscar por nombre de actor, título de película o género.</p>
		</div>
	);
};

const Error = () => {
	return <div className='pt-10 text-xl text-center'>Ocurrió un error al obtener las películas</div>;
};
