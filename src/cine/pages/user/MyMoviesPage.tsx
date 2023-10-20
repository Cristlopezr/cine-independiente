import { useNavigate, useSearchParams } from 'react-router-dom';
import Modal from 'react-modal';
import { Button, Loading, Separator } from '@/components/ui';
import { UploadMovieForm } from '@/components/cine/user/myMoviesPage';
import { CineLayout } from '@/cine/layout';
import { useGetMoviesByUserQuery } from '@/store/cine';
import { useAuthStore } from '@/hooks';
import { formatMovieTime } from '@/helpers';

Modal.setAppElement('#root');

const params = {
	upload: {
		name: 'upload',
		initialState: 'open',
	},
};

export const MyMoviesPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { user } = useAuthStore();
	const { data, isFetching, isError, error } = useGetMoviesByUserQuery(user.user_id);
	const navigate = useNavigate();

	const onCloseModal = () => {
		const uploadParam = searchParams.get(params.upload.name);
		if (uploadParam) {
			searchParams.delete(params.upload.name);
		}

		setSearchParams(searchParams);
	};

	const onOpenModal = () => {
		setSearchParams({ upload: params.upload.initialState });
	};

	const onClickMovie = (movieId: string) => {
		navigate(`/my-movies/${movieId}`);
	};

	return (
		<CineLayout>
			<div className='mt-[100px] px-10'>
				<div className='flex justify-between items-center px-5'>
					<h1 className='text-2xl font-semibold'>Mis películas</h1>
					<Button onClick={onOpenModal}>Subir</Button>
				</div>
				<Separator className='my-5' />
				<Modal
					isOpen={searchParams.get(params.upload.name) === params.upload.initialState}
					className='outline-none py-2 rounded-lg text-accent-foreground w-4/5 max-w-[960px] max-h-[800px] overflow-auto'
					overlayClassName='modal-background'
					closeTimeoutMS={200}
				>
					<UploadMovieForm onCloseModal={onCloseModal} />
				</Modal>
				{isFetching ? (
					<div className='mt-20'>
						<Loading />
					</div>
				) : (
					<>
						{isError ? (
							<>
								{isError && error && 'status' in error && error.status === 404 ? (
									<div className='text-center text-xl'>Aún no tienes películas.</div>
								) : (
									<div className='text-center text-xl'>
										Ha ocurrido un error al obtener las películas.
									</div>
								)}
							</>
						) : (
							<div className='grid'>
								<div className='grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-2'>
									{data?.userMovies?.map(movie => (
										<div key={movie.movie_id}>
											<div className='pb-3 font-semibold'>{movie.title}</div>
											<div className='border p-5 rounded-sm grid grid-cols-2 gap-2'>
												<div className='w-full'>
													<img
														className='w-full rounded-sm aspect-[16/9] object-cover'
														src={movie.imageUrl}
													/>
												</div>
												<div className='flex px-3 flex-col gap-5 items-center justify-between'>
													<div className='flex flex-col px-1 gap-3 justify-around h-full min-w-max w-full text-sm'>
														<p>Estado: {movie.enabled ? 'Activa' : 'Inactiva'}</p>
														<p>Duración: {formatMovieTime(movie.duration)} MIN</p>
														<p>Año de producción: {movie.productionYear}</p>
													</div>
													<Button
														className='w-full'
														onClick={() => onClickMovie(movie.movie_id)}
														variant='outline'
													>
														Ver detalles
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</CineLayout>
	);
};
