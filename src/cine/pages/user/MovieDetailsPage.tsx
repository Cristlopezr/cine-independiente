import { CineLayout } from '@/cine/layout';
import { CustomAlert } from '@/components';
import {
	DisableMovie,
	EditCastForm,
	EditDirectorsForm,
	EditMovieForm,
	EditWritersForm,
	MovieImage,
} from '@/components/cine/user/movieDetailsPage';
import { Loading, Separator } from '@/components/ui';
import { useShowHideAlert } from '@/hooks';
import { useGetMovieQuery } from '@/store/cine';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiSolidError } from 'react-icons/bi';

import { useParams } from 'react-router-dom';

export const MovieDetailsPage = () => {
	const { id } = useParams();

	const { showAlert, showHideAlert } = useShowHideAlert();

	const { data, isFetching, isError } = useGetMovieQuery(id!);

	if (isError) {
		return (
			<CineLayout>
				<div className='mt-[100px]'>
					<div className='text-center text-xl'>Ha ocurrido un error al obtener la película.</div>
				</div>
			</CineLayout>
		);
	}

	if (isFetching) {
		return (
			<CineLayout>
				<div className='mt-40'>
					<Loading />
				</div>
			</CineLayout>
		);
	}

	const { movie } = data!;

	return (
		<CineLayout>
			<div className='mt-[100px] px-10'>
				<h1 className='px-5 text-2xl font-semibold'>{movie.title}</h1>
				<Separator className='my-5' />
				<CustomAlert
					className={`${
						showAlert.success ? 'top-32' : '-top-24'
					} bg-background border-green-700 transition-all z-50 duration-500 ease-in-out absolute left-1/2 -translate-x-1/2 w-1/2`}
					icon={<AiOutlineCheck className='w-6 h-6 text-green-700' />}
					title='Éxito'
					description={showAlert.msg}
				/>
				<CustomAlert
					className={`${
						showAlert.error ? 'top-32' : '-top-24'
					} bg-background border-destructive transition-all duration-500 ease-in-out absolute left-1/2 -translate-x-1/2 w-1/2`}
					icon={<BiSolidError className='w-6 h-6 text-destructive' />}
					title='Error'
					description={showAlert.msg}
				/>
				<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-start gap-10'>
					<EditMovieForm movie={movie} showHideAlert={showHideAlert} />
					<MovieImage movie={movie} showHideAlert={showHideAlert} />
					<EditDirectorsForm movie={movie} showHideAlert={showHideAlert} />
					<EditWritersForm movie={movie} showHideAlert={showHideAlert} />
					<EditCastForm movie={movie} showHideAlert={showHideAlert} />
					<DisableMovie movie={movie} showHideAlert={showHideAlert} />
				</div>
			</div>
		</CineLayout>
	);
};
