import { useNavigate, useParams } from 'react-router-dom';
import { useGetMovieQuery, useGetUserListQuery } from '@/store/cine';
import { Loading } from '@/components/ui';
import { Header, MovieDetails } from '@/components/cine/moviePage';
import { useAuthStore } from '@/hooks';

export const MoviePage = () => {
	const { id } = useParams();

	const navigate = useNavigate();
	const { user } = useAuthStore();

	const { data: userList } = useGetUserListQuery(user.user_id);

	const { data, isError, isFetching } = useGetMovieQuery(id!);

	const onClickPlay = (id: string) => {
		navigate(`/movie/player/${id}`, {
			replace: true,
		});
	};

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
	const isMovieInlist = userList?.userList?.some(({ movie_id }) => movie_id === movie.movie_id);
	return (
		<div>
			<Header movie={movie} onClickPlay={onClickPlay} isMovieInlist={isMovieInlist} />
			<MovieDetails movie={movie} />
		</div>
	);
};
