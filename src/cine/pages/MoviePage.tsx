import { useNavigate, useParams } from 'react-router-dom';
import { CineLayout } from '../layout';
import { useGetMovieQuery } from '@/store/cine';
import { Loading } from '@/components/ui';
import { BsPlusLg } from 'react-icons/bs';
import { GoPlay } from 'react-icons/go';

export const MoviePage = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const onClickPlay = () => {
		navigate(`/movie/player/${id}`);
	};

	const { data, isError, isFetching } = useGetMovieQuery(id!);

	if (isError) {
		return <div>Ha ocurrido un error al obtener la película</div>;
	}

	if (isFetching) {
		return (
			<div className='mt-40'>
				<Loading text='Cargando...' />
			</div>
		);
	}

	const { movie } = data!;

	return (
		<CineLayout>
			<div className='relative w-full'>
				<div className='w-full main-slider-container relative overflow-hidden'>
					<img className='w-full' src={movie.imageUrl} alt='' />
					<div className='absolute bg-gradient-to-b from-transparent from-0% to-background top-1/4 bottom-0 left-0 right-0'></div>
				</div>
				<div className='px-14 absolute sm:top-1/2 top-2/3 flex flex-col gap-5 lg:w-1/2 sm:w-2/3'>
					<div className='font-semibold'>
						<p className='md:text-5xl sm:text-4xl text-3xl '>{movie.title}</p>
						<p className='text-gray-300'>{movie.productionYear}</p>
					</div>
					<div className='flex items-center gap-7'>
						<GoPlay onClick={onClickPlay} className='text-6xl cursor-pointer' />
						<BsPlusLg className='text-3xl cursor-pointer' />
					</div>
					<p className='text-xl'>{movie.synopsis}</p>
				</div>
			</div>
		</CineLayout>
	);
};
