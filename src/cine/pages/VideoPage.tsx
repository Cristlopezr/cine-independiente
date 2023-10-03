import { VideoElement } from '@/components/cine/videoPage';
import { Loading } from '@/components/ui';
import { useGetMovieQuery } from '@/store/cine';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

const baseUrl = 'https://storage.googleapis.com/';
export const VideoPage = () => {
	const { id } = useParams();
	const { data, isError, isFetching } = useGetMovieQuery(id!);
	const playerRef = useRef(null);

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

	const url = `${baseUrl}${movie?.movieUrl}`;
	console.log(url);

	const videoJsOptions = {
		autoplay: true,
		controls: true,
		responsive: true,
		preload: 'auto',
		language: 'es',
		controlBar: {
			remainingTimeDisplay: {
				displayNegative: true,
			},
			children: ['playToggle', 'progressControl', 'volumePanel', 'fullscreenToggle'],
		},
		sources: [
			{
				src: 'https://storage.googleapis.com/peliculas_cineindependiente/32843947-2997-46f2-a7bc-1d41825b3e15/1696274397022/master_playlist.m3u8',
				type: 'application/x-mpegURL',
			},
		],
	};

	const handlePlayerReady = (player: any) => {
		playerRef.current = player;
	};

	return <VideoElement options={videoJsOptions} onReady={handlePlayerReady} movie={data?.movie} />;
};
