import { Progress, Slider, VolumeSlider } from '@/components/ui';
import { BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs';
import { IoIosPause, IoIosPlay } from 'react-icons/io';
import { IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5';
import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import { Level } from '.';
import { Movie } from '@/interfaces';

type PlayerControlsProps = {
	onPlayPause: () => void;
	onRewind: () => void;
	availableLevels: Level[];
	onToggleFullScreen: () => void;
	onVolumeChange: (newValue: number) => void;
	onFastForward: () => void;
	onChangeQuality: (value: number) => void;
	onMute: () => void;
	onSeek: (seeked: number) => void;
	muted: boolean;
	movie: Movie;
	duration: number;
	playing: boolean;
	volume: number;
	played: number;
	loaded: number;
	elapsedTime: string;
	totalDuration: string;
	fullScreen: boolean;
};

export const PlayerControls = ({
	onPlayPause,
	playing,
	onToggleFullScreen,
	onVolumeChange,
	availableLevels,
	movie,
	onChangeQuality,
	onRewind,
	onFastForward,
	muted,
	onMute,
	duration,
	fullScreen,
	played,
	loaded,
	elapsedTime,
	totalDuration,
	onSeek,
	volume,
}: PlayerControlsProps) => {
	return (
		<div className='flex flex-col gap-3 absolute bottom-0 right-0 left-0 py-10 px-5 md:p-10 lg:px-20 lg:py-10'>
			<div className='text-2xl font-semibold tracking-wide'>{movie.title}</div>
			<div className='w-full relative'>
				<Progress
					style={{ width: `${loaded / duration}%` }}
					className='bg-primary/30 h-1 absolute top-1/2 -translate-y-1/2'
				/>
				<Slider
					className='cursor-pointer py-2'
					value={[played]}
					defaultValue={[played]}
					max={duration}
					onValueChange={e => onSeek(e[0])}
				/>
			</div>
			<div className='flex justify-between items-center'>
				<p className='tracking-widest'>
					{elapsedTime}/{totalDuration}
				</p>
				<div className='absolute left-1/2 -translate-x-1/2 flex items-center gap-1 md:gap-2 lg:gap-5 justify-center'>
					<div className='relative cursor-pointer' onClick={onRewind}>
						<p className='absolute text-[10px] top-3 lg:text-xs lg:top-4 left-1/2 -translate-x-1/2'>
							15
						</p>
						<BsArrowCounterclockwise className='w-10 h-10 lg:w-12 lg:h-12' />
					</div>
					<div>
						{playing ? (
							<IoIosPause onClick={onPlayPause} className='w-10 h-10 cursor-pointer' />
						) : (
							<IoIosPlay onClick={onPlayPause} className='w-10 h-10 cursor-pointer' />
						)}
					</div>
					<div className='relative cursor-pointer' onClick={onFastForward}>
						<p className='absolute text-[10px] lg:text-xs top-3 lg:top-4 left-1/2 -translate-x-1/2'>
							15
						</p>
						<BsArrowClockwise className='w-10 h-10 lg:w-12 lg:h-12' />
					</div>
				</div>
				<div className='flex items-center gap-1 md:gap-2 lg:gap-5'>
					<div className='flex gap-1 items-center'>
						{muted ? (
							<IoVolumeMuteOutline
								onClick={onMute}
								className='w-6 h-6 cursor-pointer'
							/>
						) : (
							<IoVolumeHighOutline
								onClick={onMute}
								className='w-6 h-6 cursor-pointer'
							/>
						)}
						<VolumeSlider
							className='h-2 cursor-pointer w-0 sm:w-16 lg:w-28'
							value={[volume * 100]}
							defaultValue={[volume * 100]}
							max={100}
							step={1}
							onValueChange={e => onVolumeChange(e[0])}
						/>
					</div>
					<select
						onChange={e => onChangeQuality(Number(e.target.value))}
						className='cursor-pointer outline-none appearance-none rtl
							 bottom-[4%] right-[15%] flex flex-col px-2 py-1 bg-background/10 rounded-sm font-semibold text-primary'
					>
						{availableLevels.map((level, index) => (
							<option
								className='font-semibold text-primary cursor-pointer'
								key={index}
								value={index}
								style={{ backgroundColor: 'hsl(224, 71.4%, 4.1%)' }}
							>
								{level.height}p
							</option>
						))}
						<option
							className='font-semibold text-primary cursor-pointer'
							style={{ backgroundColor: 'hsl(224, 71.4%, 4.1%)' }}
							value={-1}
						>
							Auto
						</option>
					</select>
					<div>
						{fullScreen ? (
							<RxExitFullScreen
								onClick={onToggleFullScreen}
								className='w-6 h-6 cursor-pointer'
							/>
						) : (
							<RxEnterFullScreen
								onClick={onToggleFullScreen}
								className='w-6 h-6 cursor-pointer'
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
