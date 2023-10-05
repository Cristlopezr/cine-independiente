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
					<div className='absolute bg-gradient-to-b from-transparent from-0% to-background top-[50%] bottom-0 left-0 right-0'></div>
					<div className='absolute bg-gradient-to-b from-transparent from-0% to-background top-[70%] bottom-0 left-0 right-0'></div>
				</div>
				<div className='px-14 absolute top-[62%] flex flex-col gap-5 w-full sm:w-4/5 lg:w-2/3 2xl:w-[60%]'>
					<div className='absolute bg-gradient-to-bl z-0 from-transparent from-[50%] to-background -top-[50%] -bottom-20 left-0 right-0'></div>
					<div className='z-10 flex flex-col gap-5'>
						<div className='font-semibold'>
							<p className='md:text-5xl sm:text-4xl xl:text-7xl'>{movie.title}</p>
							<p className='text-gray-300 mt-5 font-thin'>{movie.productionYear}</p>
						</div>
						<div className='flex items-center gap-7'>
							<GoPlay
								onClick={onClickPlay}
								className='text-6xl cursor-pointer hover:text-primary/80'
							/>
							<BsPlusLg className='text-3xl cursor-pointer' />
						</div>
						<p className='lg:text-xl'>{movie.synopsis}</p>
						<div className='mt-10 flex flex-col justify-center gap-5'>
							<div className='flex items-center gap-3'>
								<div className='flex items-center text-sm'>
									<div className='w-2 h-2 bg-primary rounded-full mr-2'></div>
									<div>Romance</div>
								</div>
								<div className='flex items-center'>
									<div className='w-2 h-2 bg-primary rounded-full mr-2'></div>
									<div>Comedia</div>
								</div>
								<div className='flex items-center'>
									<div className='w-2 h-2 bg-primary rounded-full mr-2'></div>
									<div>Cortos</div>
								</div>
								<div className='flex items-center'>
									<div className='w-2 h-2 bg-primary rounded-full mr-2'></div>
									<div>Fantasía y Ciencia ficción</div>
								</div>
							</div>
							<div className='flex gap-5'>
								<div>
									<p className='font-bold text-lg'>Directores</p>
									<ul>
										<li></li>
									</ul>
								</div>
								<div>
									<p className='font-bold text-lg'>Guionistas</p>
									<ul>
										<li></li>
									</ul>
								</div>
							</div>
							<div className='flex gap-5'>
								<div>
									<p className='font-bold text-lg'>Elenco</p>
									<ul>
										<li></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CineLayout>
	);
};
