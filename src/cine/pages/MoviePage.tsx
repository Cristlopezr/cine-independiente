import { useNavigate, useParams } from 'react-router-dom';
import { CineLayout } from '../layout';
import { useGetMovieQuery } from '@/store/cine';
import { Loading } from '@/components/ui';
import { Header, MovieDetails } from '@/components/cine/moviePage';

export const MoviePage = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const onClickPlay = (id: string) => {
		navigate(`/movie/player/${id}`, {
			replace: true,
		});
	};

	const { data, isError, isFetching } = useGetMovieQuery(id!);

	if (isError) {
		return (
			<CineLayout headerTransparent>
				<div className='mt-[100px] text-center text-xl'>
					Ha ocurrido un error al obtener la película.
				</div>
			</CineLayout>
		);
	}

	if (isFetching) {
		return (
			<CineLayout headerTransparent>
				<div className='mt-40'>
					<Loading />
				</div>
			</CineLayout>
		);
	}

	const { movie } = data!;
	return (
		<CineLayout headerTransparent>
			<Header movie={movie} onClickPlay={onClickPlay} />
			<MovieDetails movie={movie} />
		</CineLayout>
	);
};
