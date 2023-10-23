import { Loading, Separator, Skeleton } from '@/components/ui';
import React, { useCallback, useRef, useState } from 'react';
import { MovieCarouselItem, RigthGenreArrow, settingsGenre } from '@/components/cine/carousel';
import { useGetGenresWithMoviesQuery, useGetMoviesQuery } from '@/store/cine';
import Slider from 'react-slick';

const skeletons = new Array(20).fill(null);

export const MoviesPage = () => {
	const [query, setQuery] = useState('');
	const {
		data: genres,
		isFetching: isGenresFetching,
		isError: isGenresError,
	} = useGetGenresWithMoviesQuery({
		take: '',
		skip: '',
	});
	const { data: movies, isFetching, isError } = useGetMoviesQuery({ skip: '', take: '', query });
	const [isRightArrowVisible, setIsRightArrowVisible] = useState(false);

	const genresWithMovies = genres?.filter(genre => genre.movies.length > 0);

	const onChangeQuery = (genre: string) => {
		setQuery(genre);
	};

	const observer = useRef<IntersectionObserver | null>(null);
	const lastElementRef = useCallback((node: HTMLDivElement) => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					setIsRightArrowVisible(false);
					return;
				}
				setIsRightArrowVisible(true);
			},
			{ threshold: 1 }
		);
		if (node) observer.current.observe(node);
	}, []);

	return (
		<div className='mt-[100px] px-5 sm:px-10'>
			<div>
				<h1 className='text-2xl sm:px-5 font-semibold'>{query ? query : 'Películas'}</h1>
			</div>
			<Separator className='my-5' />
			{isGenresError ? (
				<div className='px-2 text-base font-semibold'>
					Ha ocurrido un error al obtener los géneros.
				</div>
			) : (
				<>
					{isGenresFetching ? (
						<Slider
							{...settingsGenre}
							nextArrow={<RigthGenreArrow isRightArrowVisible={isRightArrowVisible} />}
						>
							{skeletons.map((_, i) => {
								return (
									<div key={i} className='px-2'>
										<Skeleton className='rounded-full border w-28 h-8 font-semibold' />
									</div>
								);
							})}
						</Slider>
					) : (
						<Slider
							{...settingsGenre}
							nextArrow={<RigthGenreArrow isRightArrowVisible={isRightArrowVisible} />}
						>
							<div className='px-2'>
								<div
									className='rounded-full border px-3 py-1 font-semibold cursor-pointer'
									onClick={() => onChangeQuery('')}
								>
									Todas
								</div>
							</div>
							{genresWithMovies?.map((genre, i) => {
								if (genresWithMovies.length === i + 1) {
									return (
										<div ref={lastElementRef} className='px-2' key={genre.genre_id}>
											<div
												className='rounded-full border px-3 py-1 font-semibold cursor-pointer'
												onClick={() => onChangeQuery(genre.name)}
											>
												{genre.name}
											</div>
										</div>
									);
								}
								return (
									<div className='px-2' key={genre.genre_id}>
										<div
											className='rounded-full border px-3 py-1 font-semibold cursor-pointer'
											onClick={() => onChangeQuery(genre.name)}
										>
											{genre.name}
										</div>
									</div>
								);
							})}
						</Slider>
					)}
				</>
			)}
			<div className='flex items-center'></div>
			{isFetching ? (
				<div className='flex items-center justify-center mt-20'>
					<Loading />
				</div>
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
		</div>
	);
};

const Error = () => {
	return <div className='pt-10 text-xl text-center'>Ocurrió un error al obtener las películas.</div>;
};
