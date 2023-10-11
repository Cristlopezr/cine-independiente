import { Loading } from '@/components/ui';
import { useGetMovieQuery, useGetWatchHistoryQuery } from '@/store/cine';
import { useParams } from 'react-router-dom';
import { VideoElement } from '@/components/cine/videoPage';
import { useAuthStore } from '@/hooks';

let viewingTime: number;
export const VideoPage = () => {
	const { id } = useParams();
	const { data, isError, isFetching } = useGetMovieQuery(id!);
	const { user } = useAuthStore();
	const {
		data: viewingTimes,
		isSuccess,
		isFetching: isWatchHistoryFetching,
	} = useGetWatchHistoryQuery(user.user_id);

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

	if (isWatchHistoryFetching) {
		return (
			<div className='mt-40'>
				<Loading />
			</div>
		);
	}

	const { movie } = data!;

	if (isSuccess) {
		const viewingTimeFound = viewingTimes.watchHistory.find(
			({ movie_id }) => movie_id === movie.movie_id
		)!;

		viewingTime = viewingTimeFound.viewingTime;
	}

	return <VideoElement movie={movie} viewingTime={viewingTime} />;
};
