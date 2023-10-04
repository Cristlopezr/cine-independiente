import { Loading } from '@/components/ui';
import { useGetMovieQuery } from '@/store/cine';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import es from 'video.js/dist/lang/es.json';
import qualitySelectorHls from 'videojs-quality-selector-hls';

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

	const videoJsOptions = {
		autoplay: true,
		controls: true,
		responsive: true,
		preload: 'none',
		language: 'es',
		controlBar: {
			remainingTimeDisplay: {
				displayNegative: true,
			},
			children: ['playToggle', 'progressControl', 'volumePanel', 'fullscreenToggle'],
		},
		sources: [
			{
				src: url,
				type: 'application/x-mpegURL',
			},
		],
	};

	const handlePlayerReady = (player: any) => {
		playerRef.current = player;
	};

	return (
		<div>
			<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
		</div>
	);
};

const VideoJS = (props: any) => {
	const videoRef = useRef<HTMLDivElement | null>(null);
	const playerRef = useRef<Player | null>(null);
	const { options, onReady } = props;

	useEffect(() => {
		// Make sure Video.js player is only initialized once
		if (!videojs.getPlugin('qualitySelectorHls')) {
			videojs.registerPlugin('qualitySelectorHls', qualitySelectorHls);
		}
		videojs.addLanguage('es', es);
		if (!playerRef.current) {
			// The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
			const videoElement = document.createElement('video-js');
			videoElement.style.objectFit = 'contain';
			videoElement.style.width = '100vw'; // Asegura que el video tome el 100% del ancho
			videoElement.style.height = '100vh'; // Asegura que el video tome el 100% del alto
			videoRef?.current?.appendChild(videoElement);

			const player = (playerRef.current = videojs(videoElement, options, () => {
				onReady && onReady(player);
			}));

			(player as any).qualitySelectorHls({
				displayCurrentQuality: true,
				placementIndex: 2,
				vjsIconClass: 'vjs-icon-hd',
			});
			// You could update an existing player in the `else` block here
			// on prop change, for example:
		} else {
			const player = playerRef.current;
			player.autoplay(options.autoplay);
			player.src(options.sources);
		}
	}, [options, videoRef]);

	// Dispose the Video.js player when the functional component unmounts
	useEffect(() => {
		const player = playerRef.current;
		return () => {
			if (player && !player.isDisposed()) {
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);

	return (
		<div>
			<div ref={videoRef} />
		</div>
	);
};
