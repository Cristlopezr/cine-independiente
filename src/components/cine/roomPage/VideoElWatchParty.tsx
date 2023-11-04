import { Movie, UserWatchParty } from '@/interfaces';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { PlayerControls } from '../videoPage/PlayerControls';
import { OnProgressProps } from 'react-player/base';
import { Avatar, AvatarFallback, AvatarImage, Loading } from '@/components/ui';
import { BsChevronLeft } from 'react-icons/bs';
import { useSaveWatchHistoryMutation } from '@/store/cine';
import { useAuthStore } from '@/hooks';
import { formatMovieTime } from '@/helpers';
import type { Socket } from 'socket.io-client';
export type Level = {
	height: number;
};
const baseUrl = 'https://storage.googleapis.com/';
const urlBeacon = `${import.meta.env.VITE_API_CINE_BASE_URL}/movie/save-watch-history`;
type MovieState = 'started' | 'not-started';
type PlayerState = {
	playing: boolean; //true,
	muted: boolean; //false,
	volume: number; //1,
	volumeSeek: number; //1,
	fullScreen: boolean; // false,
	played: number; //0,
	loaded: number; //0,
	seeking: boolean; //false,
};
type VideoElWatchPartyProps = {
	movie: Movie;
	viewingTime: number;
	socket: Socket;
	room_id: string;
	onSetMovieState: (movie_state: MovieState, socket: Socket) => void;
	playerState: PlayerState;
	setPlayerState: (playerState: PlayerState) => void;
	playerRef: React.MutableRefObject<ReactPlayer | null>;
	participants: UserWatchParty[];
};

export const VideoElWatchParty = ({
	movie,
	/* viewingTime = 0, */
	socket,
	room_id,
	onSetMovieState,
	playerState,
	setPlayerState,
	playerRef,
	participants,
}: VideoElWatchPartyProps) => {
	const [availableLevels, setAvailableLevels] = useState<Level[]>([]);
	const playerContainerRef = useRef(null);
	const [count, setCount] = useState(0);
	const [showControls, setShowControls] = useState(true);
	const [loading, setLoading] = useState(false);
	const [saveWatchHistory] = useSaveWatchHistoryMutation();
	const playedRef = useRef(0);
	const { user } = useAuthStore();

	const currentTime = playerRef.current?.getCurrentTime() || 0;
	const duration = movie.duration || 0;

	const elapsedTime = formatMovieTime(currentTime!);
	const totalDuration = formatMovieTime(duration);

	const { playing, muted, volume, volumeSeek, fullScreen, played, loaded, seeking } = playerState;
	const participantsWatchingMovie = participants.filter(
		participant => participant?.user_movie_state === 'started'
	);

	useEffect(() => {
		const handleBeforeUnload = () => {
			const formData = new FormData();
			formData.append('user_id', user.user_id);
			formData.append('movie_id', movie.movie_id);
			formData.append('currentTime', playerRef.current?.getCurrentTime().toString() || (0).toString());
			if (document.visibilityState === 'hidden') {
				navigator.sendBeacon(urlBeacon, formData);
			}
		};

		document.addEventListener('visibilitychange', handleBeforeUnload);
		return () => {
			document.removeEventListener('visibilitychange', handleBeforeUnload);
			onSaveWatchHistory(playedRef.current);
		};
	}, []);

	useEffect(() => {
		playedRef.current = played;
	}, [played]);

	const handlePlayerReady = () => {
		if (playerRef.current) {
			const hlsPlayer = playerRef.current.getInternalPlayer('hls');

			if (hlsPlayer) {
				const levels = hlsPlayer.levels.map((level: any) => ({
					height: level.height,
				}));
				setAvailableLevels(levels);
			}
		}
	};

	const onPlayPause = () => {
		setPlayerState({ ...playerState, playing: !playing });
		socket.emit('CLIENT:play-pause', { room_id, playing: !playing });
		//!EMITIR STATE PLAY PAUSE
	};

	const onRewind = () => {
		playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 15);
		//!EMITIR SEEK
	};

	const onFastForward = () => {
		playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 15);
		//!EMITIR SEEK
	};

	const onMute = () => {
		setPlayerState({ ...playerState, muted: !muted, volume: !muted ? 0 : volumeSeek });
	};

	const onVolumeChange = (newValue: number) => {
		setPlayerState({
			...playerState,
			volume: newValue / 100,
			volumeSeek: newValue / 100,
			muted: newValue === 0 ? true : false,
		});
	};

	const onToggleFullScreen = () => {
		screenfull.toggle(playerContainerRef.current!);

		setPlayerState({ ...playerState, fullScreen: !screenfull.isFullscreen });
	};

	const onProgress = (state: OnProgressProps) => {
		if (count > 5) {
			setShowControls(false);
		}

		if (showControls) {
			setCount(count + 1);
		}

		if (playerRef.current) {
			const hlsPlayer = playerRef.current.getInternalPlayer('hls');
			hlsPlayer.startLoad();
		}

		if (!seeking) {
			setPlayerState({ ...playerState, played: state.playedSeconds, loaded: state.loadedSeconds });
			socket.emit('CLIENT:on-progress', {
				room_id,
				user_time_stamp: state.playedSeconds,
				user_id: user.user_id,
				playing,
			});
		}
	};

	const onMouseMove = () => {
		setCount(0);
		setShowControls(true);
	};

	const onSeek = (seeked: number) => {
		if (playerRef.current) {
			const hlsPlayer = playerRef.current.getInternalPlayer('hls');
			hlsPlayer.stopLoad();
		}

		setPlayerState({ ...playerState, played: seeked, seeking: true });
		playerRef.current?.seekTo(seeked);
		socket.emit('CLIENT:user-seek', { room_id, seek_time_stamp: seeked, playing });
	};

	const onSeekEnded = () => {
		setPlayerState({ ...playerState, seeking: false });
	};

	const onChangeQuality = (levelIndex: number) => {
		if (playerRef.current) {
			const hlsPlayer = playerRef.current.getInternalPlayer('hls');
			hlsPlayer.currentLevel = levelIndex;
		}
	};

	const onBuffer = () => {
		setLoading(true);
	};

	const onBufferEnd = () => {
		setLoading(false);
	};

	const url = `${baseUrl}${movie?.movieUrl}`;

	const onGoBack = () => {
		onSetMovieState('not-started', socket);
	};

	const onEnded = () => {
		socket.emit('CLIENT:movie-ended', {
			room_id,
			room_status: 'waiting',
			movie_state: 'not-started',
		});
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'space') {
			onPlayPause();
			onMouseMove();
		}
	};

	const onSaveWatchHistory = async (currentTime: number) => {
		await saveWatchHistory({
			user_id: user.user_id,
			movie_id: movie.movie_id,
			currentTime,
			movie,
		});
	};

	return (
		<div
			ref={playerContainerRef}
			onMouseMove={onMouseMove}
			className='h-screen relative bg-black outline-none'
			onKeyDown={onKeyDown}
			tabIndex={0}
		>
			<div className='absolute z-10 top-2 left-2 flex flex-col gap-2 opacity-80'>
				{participantsWatchingMovie.map(({ avatarUrl, name, user_id }) => (
					<div key={user_id} className='flex items-center gap-3'>
						<Avatar className='w-6 h-6 border-border-second border-2'>
							<AvatarImage src={avatarUrl ? avatarUrl : undefined} />
							<AvatarFallback className='text-base'>{name.slice(0, 1)}</AvatarFallback>
						</Avatar>
						<p className='text-sm'>{name}</p>
					</div>
				))}
			</div>
			<BsChevronLeft
				onClick={onGoBack}
				className={`absolute top-[8%] left-5 md:left-10 lg:left-20 z-50 w-10 h-10 ${
					showControls ? 'opacity-100' : 'opacity-0'
				} cursor-pointer transition-all duration-700 ease-out`}
			/>
			<div className={showControls ? 'opacity-100' : 'opacity-0'}>
				<div className='absolute bg-gradient-to-t from-transparent from-0% to-background pointer-events-none top-0 bottom-[85%] left-0 right-0'></div>
				<div className='absolute bg-gradient-to-b from-transparent from-0% to-background pointer-events-none top-[75%] bottom-0 left-0 right-0'></div>
			</div>
			<div
				className={`${
					loading ? 'visible' : 'hidden'
				} absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
			>
				{participantsWatchingMovie.length > 1 && (
					<p className='font-semibold text-lg'>Sincronizando</p>
				)}
				<Loading className='md:w-10 md:h-10 lg:w-12 lg:h-12' />
			</div>
			<ReactPlayer
				config={{
					file: {
						forceHLS: true,
					},
				}}
				ref={playerRef}
				width='100%'
				height='100%'
				url={url}
				volume={volume}
				muted={muted}
				onReady={handlePlayerReady}
				playing={playing}
				onProgress={onProgress}
				onSeek={onSeekEnded}
				progressInterval={500}
				onBuffer={onBuffer}
				onBufferEnd={onBufferEnd}
				onEnded={onEnded}
			/>
			<div
				className={`${
					showControls ? 'opacity-100' : 'opacity-0'
				} transition-all duration-300 ease-in-out`}
			>
				<PlayerControls
					onPlayPause={onPlayPause}
					playing={playing}
					onRewind={onRewind}
					onFastForward={onFastForward}
					muted={muted}
					onMute={onMute}
					movie={movie}
					volume={volume}
					onVolumeChange={onVolumeChange}
					onToggleFullScreen={onToggleFullScreen}
					fullScreen={fullScreen}
					played={played}
					onSeek={onSeek}
					elapsedTime={elapsedTime}
					totalDuration={totalDuration}
					loaded={loaded}
					duration={duration}
					onChangeQuality={onChangeQuality}
					availableLevels={availableLevels}
				/>
			</div>
		</div>
	);
};
