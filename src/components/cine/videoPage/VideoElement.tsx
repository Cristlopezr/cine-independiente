import { Movie } from '@/interfaces';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { PlayerControls } from '.';
import { OnProgressProps } from 'react-player/base';

export type Level = {
	height: number;
};
const baseUrl = 'https://storage.googleapis.com/';

const format = (seconds: number) => {
	if (isNaN(seconds)) {
		return '00:00';
	}

	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes();
	const ss = date.getUTCSeconds().toString().padStart(2, '0');
	if (hh) {
		return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
	}
	return `${mm}:${ss}`;
};

export const VideoElement = ({ movie }: { movie: Movie }) => {
	const [availableLevels, setAvailableLevels] = useState<Level[]>([]);
	const [playerState, setPlayerState] = useState({
		playing: true,
		muted: false,
		volume: 1,
		volumeSeek: 1,
		fullScreen: false,
		played: 0,
		loaded: 0,
	});
	const playerRef = useRef<ReactPlayer | null>(null);
	const playerContainerRef = useRef(null);
	const [count, setCount] = useState(0);
	const [showControls, setShowControls] = useState(true);

	const { playing, muted, volume, volumeSeek, fullScreen, played, loaded } = playerState;

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
	};

	const onRewind = () => {
		playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 15);
	};

	const onFastForward = () => {
		playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 15);
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
		if (count > 1) {
			setShowControls(false);
		}

		if (showControls) {
			setCount(count + 1);
		}

		setPlayerState({ ...playerState, played: state.played, loaded: state.loaded });
	};

	const onMouseMove = () => {
		setCount(0);
		setShowControls(true);
	};

	const onSeek = (seeked: number) => {
		setPlayerState({ ...playerState, played: seeked / 100 });
		playerRef.current?.seekTo(seeked / 100);
	};

	const onChangeQuality = (levelIndex: number) => {
		if (playerRef.current) {
			const hlsPlayer = playerRef.current.getInternalPlayer('hls');
			hlsPlayer.currentLevel = levelIndex;
		}
	};

	const currentTime = playerRef.current?.getCurrentTime();
	const duration = playerRef.current?.getDuration();

	const elapsedTime = format(currentTime!);
	const totalDuration = format(duration!);

	const url = `${baseUrl}${movie?.movieUrl}`;
	return (
		<div ref={playerContainerRef} onMouseMove={onMouseMove} className='h-screen relative'>
			<ReactPlayer
				ref={playerRef}
				width='100%'
				height='100%'
				url={url}
				volume={volume}
				muted={muted}
				onReady={handlePlayerReady}
				playing={playing}
				onProgress={onProgress}
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
					volume={volume}
					onVolumeChange={onVolumeChange}
					onToggleFullScreen={onToggleFullScreen}
					fullScreen={fullScreen}
					played={played}
					onSeek={onSeek}
					elapsedTime={elapsedTime}
					totalDuration={totalDuration}
					loaded={loaded}
					onChangeQuality={onChangeQuality}
					availableLevels={availableLevels}
				/>
			</div>
		</div>
	);
};
