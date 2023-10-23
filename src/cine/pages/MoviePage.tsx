import { useNavigate, useParams } from 'react-router-dom';
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
			<div className='mt-[100px] text-center text-xl'>Ha ocurrido un error al obtener la película.</div>
		);
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
		<div>
			<Header movie={movie} onClickPlay={onClickPlay} />
			<MovieDetails movie={movie} />
		</div>
	);
};
