import { useNavigate, useParams } from 'react-router-dom';
import { CineLayout } from '../layout';
import { useGetMovieQuery } from '@/store/cine';
import { Loading } from '@/components/ui';
import { HeaderImage, MovieDetails, MovieInfo } from '@/components/cine/moviePage';

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
		return <div>Ha ocurrido un error al obtener la película</div>;
	}

	if (isFetching) {
		return (
			<div className='mt-40'>
				<Loading />
			</div>
		);
	}

	const { movie } = data!;

	return (
		<CineLayout>
			<div className='relative w-full'>
				<HeaderImage imageUrl={movie.imageUrl} />
				<MovieInfo movie={movie} onClickPlay={onClickPlay} />
			</div>
			<MovieDetails movie={movie} />
		</CineLayout>
	);
};
