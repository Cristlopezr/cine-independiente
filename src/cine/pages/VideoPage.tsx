import { Loading } from '@/components/ui';
import { useGetMovieQuery } from '@/store/cine';
import { useParams } from 'react-router-dom';
import { VideoElement } from '@/components/cine/videoPage';
import { useCineStore } from '@/hooks';

export const VideoPage = () => {
	const { id } = useParams();
	const { data, isError, isFetching } = useGetMovieQuery(id!);

	const { watchHistory } = useCineStore();

	if (isError) {
		return <div>Ha ocurrido un error al reproducir la película</div>;
	}

	if (isFetching) {
		return (
			<div className='mt-40'>
				<Loading />
			</div>
		);
	}

	const { movie } = data!;
	const history = watchHistory?.find(({ movie_id }) => movie_id === movie.movie_id);
	return <VideoElement movie={movie} viewingTime={history?.viewingTime || 0} />;
};
