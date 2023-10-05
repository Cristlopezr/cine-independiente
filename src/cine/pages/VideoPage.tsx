import { Loading } from '@/components/ui';
import { useGetMovieQuery } from '@/store/cine';
import { useParams } from 'react-router-dom';
import { VideoElement } from '@/components/cine/videoPage';

export const VideoPage = () => {
	const { id } = useParams();
	const { data, isError, isFetching } = useGetMovieQuery(id!);

	if (isError) {
		return <div>Ha ocurrido un error al reproducir la película</div>;
	}

	if (isFetching) {
		return (
			<div className='mt-40'>
				<Loading text='Cargando...' />
			</div>
		);
	}

	const { movie } = data!;

	return <VideoElement movie={movie} />;
};
