import { useEffect, useRef, useState } from 'react';
import Player from 'video.js/dist/types/player';
import videojs from 'video.js';
import qualitySelectorHls from 'videojs-quality-selector-hls';
import es from 'video.js/dist/lang/es.json';
import { useSaveWatchHistoryMutation } from '@/store/cine';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
export const VideoElement = (props: any) => {
	const videoRef = useRef<HTMLDivElement | null>(null);
	const playerRef = useRef<Player | null>(null);
	const [saveWatchHistory] = useSaveWatchHistoryMutation();
	const [showArrow, setShowArrow] = useState(false);
	const navigate = useNavigate();
	const { options, onReady, movie } = props;

	useEffect(() => {
		if (!videojs.getPlugin('qualitySelectorHls')) {
			videojs.registerPlugin('qualitySelectorHls', qualitySelectorHls);
		}
		videojs.addLanguage('es', es);
		if (!playerRef.current) {
			const videoElement = document.createElement('video-js');
			videoElement.style.objectFit = 'contain';

			videoElement.style.width = '100vw';
			videoElement.style.height = '100vh';
			videoRef?.current?.appendChild(videoElement);

			const player = (playerRef.current = videojs(videoElement, options, () => {
				onReady && onReady(player);
			}));
			(player as any).qualitySelectorHls({
				displayCurrentQuality: true,
				placementIndex: 2,
				vjsIconClass: 'vjs-icon-hd',
			});
			// Manejar cambios de calidad
			player.on('change', (e: any) => {
				if (e.type === 'changesource') {
					// Reiniciar el watcher aquí
					player.tech_._vhs.fastQualityChange_ = false;
				}
			});
			player.on('useractive', () => {
				setShowArrow(true);
			});

			player.on('play', () => {
				setShowArrow(true);
			});

			player.on('userinactive', () => {
				setShowArrow(false);
			});
		} else {
			const player = playerRef.current;
			player.autoplay(options.autoplay);
			player.src(options.sources);
		}
	}, [options, videoRef]);

	const onSaveWatchHistory = async (player: Player) => {
		await saveWatchHistory({
			user_id: movie.user_id as string,
			movie_id: movie.movie_id as string,
			currentTime: player.currentTime()!,
		});
	};
	useEffect(() => {
		const handleBeforeUnload = () => {
			const formData = new FormData();
			formData.append('user_id', movie.user_id);
			formData.append('movie_id', movie.movie_id);
			formData.append('currentTime', player?.currentTime()?.toString()!);
			if (document.visibilityState === 'hidden') {
				console.log('asdasd');
				navigator.sendBeacon(
					'https://server-cine-independiente.vercel.app/api/movie/save-watch-history',
					formData
				);
			}
		};

		document.addEventListener('visibilitychange', handleBeforeUnload);
		const player = playerRef.current;
		return () => {
			document.removeEventListener('visibilitychange', handleBeforeUnload);
			if (player && !player.isDisposed()) {
				onSaveWatchHistory(player);
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);

	const onGoBack = () => {
		navigate(`/movie/${movie.movie_id}`);
	};

	return (
		<div ref={videoRef} className='relative'>
			<BsChevronLeft
				onClick={onGoBack}
				className={`absolute top-[8%] left-10 z-50 w-10 h-10 ${
					showArrow ? 'opacity-100' : 'opacity-0'
				} cursor-pointer transition-all duration-700 ease-out`}
			/>
		</div>
	);
};
