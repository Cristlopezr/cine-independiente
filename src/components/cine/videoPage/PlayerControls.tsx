import { Progress, Slider, VolumeSlider } from '@/components/ui';
import { BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs';
import { IoIosPause, IoIosPlay } from 'react-icons/io';
import { IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5';
import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import { Level } from '.';

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
	onChangeQuality,
	onRewind,
	onFastForward,
	muted,
	onMute,
	fullScreen,
	played,
	loaded,
	elapsedTime,
	totalDuration,
	onSeek,
	volume,
}: PlayerControlsProps) => {
	return (
		<>
			<div className='flex gap-16 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
				<div className='relative cursor-pointer' onClick={onRewind}>
					<p className='absolute top-5 left-1/2 -translate-x-1/2'>15</p>
					<BsArrowCounterclockwise className='w-16 h-16' />
				</div>
				<div className='relative cursor-pointer' onClick={onFastForward}>
					<p className='absolute top-5 left-1/2 -translate-x-1/2'>15</p>
					<BsArrowClockwise className='w-16 h-16' />
				</div>
			</div>
			<div className='absolute bottom-0 right-0 left-0 p-10 flex items-center justify-between gap-5'>
				<div className='flex items-center gap-5'>
					{playing ? (
						<IoIosPause onClick={onPlayPause} className='w-10 h-10 cursor-pointer' />
					) : (
						<IoIosPlay onClick={onPlayPause} className='w-10 h-10 cursor-pointer' />
					)}
					<div className='flex w-28 gap-1 items-center'>
						{muted ? (
							<IoVolumeMuteOutline onClick={onMute} className='w-10 h-10 cursor-pointer' />
						) : (
							<IoVolumeHighOutline onClick={onMute} className='w-10 h-10 cursor-pointer' />
						)}
						<VolumeSlider
							className='h-2'
							value={[volume * 100]}
							defaultValue={[volume * 100]}
							max={100}
							step={1}
							onValueChange={e => onVolumeChange(e[0])}
						/>
					</div>
				</div>
				<div className='w-full relative'>
					<Progress
						style={{ width: `${loaded * 100}%` }}
						className='bg-primary/30 h-1 absolute top-1/2 -translate-y-1/2'
					/>
					<Slider
						className='cursor-pointer py-2'
						value={[played * 100]}
						defaultValue={[played * 100]}
						max={100}
						step={1}
						onValueChange={e => onSeek(e[0])}
					/>
					<p className='absolute top-4'>
						{elapsedTime}/{totalDuration}
					</p>
				</div>
				<div className='flex items-center gap-5'>
					<select
						onChange={e => onChangeQuality(Number(e.target.value))}
						className='cursor-pointer outline-none appearance-none rtl
							 bottom-[4%] right-[15%] flex flex-col px-5 py-2 bg-primary/50 rounded-sm font-semibold text-background'
					>
						{availableLevels.map((level, index) => (
							<option
								className='font-semibold text-background cursor-pointer'
								key={index}
								value={index}
							>
								{level.height}p
							</option>
						))}
						<option className='font-semibold text-background cursor-pointer' value={-1}>
							Auto
						</option>
					</select>

					{fullScreen ? (
						<RxExitFullScreen onClick={onToggleFullScreen} className='w-10 h-10 cursor-pointer' />
					) : (
						<RxEnterFullScreen
							onClick={onToggleFullScreen}
							className='w-10 h-10 cursor-pointer'
						/>
					)}
				</div>
			</div>
		</>
	);
};
