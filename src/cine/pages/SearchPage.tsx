import { Input, Loading } from '@/components/ui';
import { CineLayout } from '../layout';
import { BsSearch } from 'react-icons/bs';
import { useGetMoviesQuery } from '@/store/cine';
import { MovieCarouselItem } from '@/components/cine/carousel';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks';
import React from 'react';

export const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams({ q: '' });
	const query = searchParams.get('q') || '';
	const debouncedQuery = useDebounce(query);

	const { data: movies, isError, isFetching, error } = useGetMoviesQuery(debouncedQuery);
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchParams({ q: e.target.value });
	};

	return (
		<CineLayout>
			<div className='mt-32 px-10'>
				<SearchInput onChange={onChange} query={query} />
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
		</CineLayout>
	);
};

const SearchInput = ({
	onChange,
	query,
}: {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	query: string;
}) => {
	return (
		<div className='relative flex items-center gap-5'>
			<BsSearch className='absolute left-5 w-7 h-7' />
			<Input
				placeholder='¿Qué película quieres ver?'
				className='py-8 px-20 text-2xl'
				onChange={onChange}
				value={query}
				spellCheck={false}
			/>
		</div>
	);
};

const NotFound = () => {
	return (
		<div className='pt-10 text-xl text-center flex flex-col gap-3'>
			<p>No se encontraron películas que coincidan con la búsqueda.</p>
			<p>Puedes buscar por nombre de actor, título de película y género.</p>
		</div>
	);
};

const Error = () => {
	return <div className='pt-10 text-xl text-center'>Ocurrió un error al obtener las películas</div>;
};
