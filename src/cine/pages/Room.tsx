import { CustomAlert } from '@/components';
import { Header } from '@/components/cine/layout';
import { Chat, VideoElWatchParty } from '@/components/cine/roomPage';
import { Avatar, AvatarFallback, AvatarImage, Button, Loading, Separator } from '@/components/ui';
import { formatMovieTime } from '@/helpers';
import { useAuthStore, useShowHideAlert } from '@/hooks';
import { UserWatchParty } from '@/interfaces';
import { useGetMovieQuery } from '@/store/cine';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

const MAX_PARTICIPANTS = 3;
const MAX_TIME_DIFFERENCE = 0.15;
const pageText = {
	pageTitle: 'Ver en grupo',
	inviteText: 'Invita hasta 2 amigos a tu grupo.',
	leaveGroupButton: 'Salir del grupo',
	startWatchingButton: 'Empezar a ver',
	roomComplete: 'La sala está completa.',
};
const baseUrl = import.meta.env.VITE_BASE_URL;
type RoomStatus = 'playing' | 'waiting';
export type MovieState = 'started' | 'not-started';
type Message = {
	message_id: string;
	msg: string;
	user: UserWatchParty;
	time: string;
};

export const Room = () => {
	const { movie_id, room_id } = useParams();
	const { user } = useAuthStore();
	const [participants, setParticipants] = useState<UserWatchParty[]>([]);
	const [movieState, setMovieState] = useState<MovieState>('not-started');
	const [socket, setSocket] = useState<Socket>();
	const [roomStatus, setRoomStatus] = useState<RoomStatus>('waiting');
	const navigate = useNavigate();
	const { data, isError, isFetching } = useGetMovieQuery(movie_id!);
	const playerRef = useRef<ReactPlayer | null>(null);
	const [showControls, setShowControls] = useState(true);
	const [count, setCount] = useState(0);
	const { showAlert, showHideAlert } = useShowHideAlert();
	const [isChatOpen, setIsChatOpen] = useState(false);
	const playerContainerRef = useRef(null);
	const [playerState, setPlayerState] = useState({
		playing: true,
		muted: false,
		volume: 1,
		volumeSeek: 1,
		fullScreen: false,
		played: 0,
		loaded: 0,
		seeking: false,
	});
	const [messages, setMessages] = useState<Message[]>([]);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const onSetMovieState = (movie_state: MovieState, socket: Socket) => {
		setMovieState(movie_state);
		socket.emit('CLIENT:user-movie-state', { room_id, user_id: user.user_id, movie_state });
	};

	useEffect(() => {
		const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
			transports: ['websocket'],
		});
		setSocket(socket);
		socket.on('connect', () => {
			socket.emit('CLIENT:user-joined-room', { room_id, user: { ...user } });
		});

		socket.on('SERVER:messages', ({ messages }) => {
			setMessages(messages);
		});

		socket.on('SERVER:participants', ({ participants }) => {
			setParticipants(participants);
		});

		socket.on('SERVER:started-movie', ({ movie_state }) => {
			onSetMovieState(movie_state, socket);
		});

		socket.on('SERVER:room-status', ({ room_status }) => {
			setRoomStatus(room_status);
		});

		socket.on('SERVER:sent-message', ({ msg }) => {
			setMessages(prevMessages => [...prevMessages, msg]);
		});

		socket.on('SERVER:time-stamp', ({ maxTime, playing }) => {
			if (playerRef.current) {
				if (maxTime - playerRef?.current?.getCurrentTime() > MAX_TIME_DIFFERENCE) {
					playerRef.current.seekTo(maxTime, 'seconds');
					setPlayerState(prevPlayerState => ({ ...prevPlayerState, playing }));
				}
			}
		});

		socket.on('SERVER:movie-ended', ({ room_status, movie_state }) => {
			setRoomStatus(room_status);
			onSetMovieState(movie_state, socket);
		});

		socket.on('SERVER:mouse-move', () => {
			setCount(0);
			setShowControls(true);
		});

		socket.on('SERVER:play-pause', ({ playing }) => {
			setPlayerState(prevPlayerState => ({ ...prevPlayerState, playing }));
		});

		socket.on('SERVER:user-seeked', ({ seek_time_stamp, playing }) => {
			if (playerRef.current) {
				const hlsPlayer = playerRef.current.getInternalPlayer('hls');
				hlsPlayer.stopLoad();
			}
			setPlayerState(prevPlayerState => ({
				...prevPlayerState,
				played: seek_time_stamp,
				seeking: true,
				playing,
			}));
			playerRef.current?.seekTo(seek_time_stamp);
		});

		socket.on('disconnect', () => {});
		return () => {
			socket.off('SERVER:started-movie');
			socket.off('SERVER:user-seeked');
			socket.off('SERVER:play-pause');
			socket.off('SERVER:movie-ended');
			socket.off('SERVER:time-stamp');
			socket.off('SERVER:participants');
			socket.off('SERVER:mouse-move');
			socket.off('SERVER:room-status');
			socket.off('SERVER:sent-message');
			socket.off('SERVER:messages');
			socket.off('connect');
			socket.off('disconnect');
			socket.close();
		};
	}, []);

	if (isError) {
		return (
			<div className='mt-[100px] text-center text-xl'>Ha ocurrido un error al obtener la película.</div>
		);
	}

	if (isFetching) {
		return (
			<div className='mt-40'>
				<Loading />
			</div>
		);
	}

	const onLeaveWatchParty = () => {
		navigate('/');
	};

	const onClickPlay = () => {
		socket?.emit('CLIENT:start-movie', {
			room_id,
			room_status: 'playing',
			movie_state: 'started',
		});
	};

	const onCopyLink = () => {
		const link = `${baseUrl}/room/${movie_id}/${room_id}`;
		navigator.clipboard.writeText(link).then(() => {
			showHideAlert('success', 'Enlace copiado');
		});
	};

	const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputRef.current || inputRef.current.value === '') return;

		const now = new Date();
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const seconds = now.getSeconds().toString().padStart(2, '0');

		const time = `${hours}:${minutes}:${seconds}`;
		const message_id = now.getTime().toString();
		setMessages([...messages, { user, msg: inputRef.current?.value, time, message_id }]);
		socket?.emit('CLIENT:send-message', {
			room_id,
			user,
			msg: inputRef.current?.value,
			time,
			message_id,
		});
		inputRef.current.value = '';
	};

	const { movie } = data!;
	return (
		<>
			<CustomAlert
				className={`${
					showAlert.success ? 'top-32' : '-top-24'
				} bg-background border-green-700 transition-all z-50 duration-500 ease-in-out absolute left-1/2 -translate-x-1/2 w-1/2`}
				icon={<AiOutlineCheck className='w-6 h-6 text-green-700' />}
				title='Éxito'
				description={showAlert.msg}
			/>
			{movieState === 'not-started' && (
				<>
					<Header />
					<div className='pt-[100px] px-5 sm:px-10'>
						<h1 className='text-2xl sm:px-5 font-semibold'>{pageText.pageTitle}</h1>
						<Separator className='my-5' />
						<div className='grid grid-cols-1 gap-3 lg:grid-cols-3 p-2'>
							<div className='flex flex-col w-full md:max-w-[600px] sm:px-5 gap-10 mx-auto'>
								<h2 className='text-2xl'>{movie.title}</h2>
								<div className='w-full rounded-md overflow-hidden'>
									<img src={movie.imageUrl} className='w-full' alt='Imagen película' />
								</div>
								<div className='flex flex-col gap-5'>
									<p>{movie.synopsis}</p>
									<div className='flex text-xs md:text-base items-center gap-5 text-white/70 font-normal tracking-widest'>
										<p className='drop-shadow-[0_5px_5px_hsla(224,71.4%,4.1%,1)]'>
											{formatMovieTime(movie.duration)} MIN
										</p>
										<p className='drop-shadow-[0_5px_5px_hsla(224,71.4%,4.1%,1)]'>
											{movie.productionYear}
										</p>
									</div>
									<div className='flex flex-col gap-5'>
										<ul className='flex text-xs flex-wrap gap-5 sm:text-sm'>
											{movie.genres.map(({ name, genre_id }) => (
												<li key={genre_id} className='flex items-center gap-2'>
													<div className='w-1 h-1 bg-white/80 rounded-full'></div>
													{name}
												</li>
											))}
										</ul>
									</div>
								</div>
								<Button onClick={onLeaveWatchParty} className='w-fit'>
									{pageText.leaveGroupButton}
								</Button>
							</div>
							<div className='flex flex-col items-center gap-10 lg:pt-[100px]'>
								{participants.length === MAX_PARTICIPANTS && (
									<div>{pageText.roomComplete}</div>
								)}
								{roomStatus === 'playing' && (
									<div>La película ya empezó, unete haciendo clic en empezar a ver.</div>
								)}
								<div className='flex gap-10 items-center'>
									{participants.length === 0 ? (
										<div className='w-[10rem] h-[10rem] flex items-center justify-center'>
											<Loading className='h-10 w-10' />
										</div>
									) : (
										participants.map(({ user_id, name, avatarUrl }, i) => (
											<span
												key={user_id}
												className={`flex flex-col items-center ${
													i === 0 ? 'order-2' : i === 1 ? 'order-1' : 'order-3'
												}`}
											>
												<Avatar
													className={`${
														i === 0 ? 'w-[5rem] h-[5rem]' : 'w-[3rem] h-[3rem]'
													} border-2 border-border-second`}
												>
													<AvatarImage src={avatarUrl ? avatarUrl : undefined} />
													<AvatarFallback className='text-2xl'>
														{name.slice(0, 1)}
													</AvatarFallback>
												</Avatar>
												<p className='hidden md:block text-white mt-1'>{name}</p>
											</span>
										))
									)}
								</div>
								<div className='flex flex-col gap-10 items-center w-full'>
									<Button onClick={onClickPlay} className='w-fit'>
										{pageText.startWatchingButton}
									</Button>
									<div className='flex flex-col items-center'>
										<p className='text-xl font-semibold'>{pageText.inviteText}</p>
										<Button variant='link' className='text-base' onClick={onCopyLink}>
											Copiar enlace
										</Button>
									</div>
								</div>
							</div>
							<Chat
								inputRef={inputRef}
								messages={messages}
								onSubmitMessage={onSubmitMessage}
								user={user}
								setIsChatOpen={setIsChatOpen}
								movieState={movieState}
								isChatOpen={isChatOpen}
							/>
						</div>
					</div>
				</>
			)}
			{movieState === 'started' && (
				<div className='flex' ref={playerContainerRef}>
					<VideoElWatchParty
						movie={movie}
						viewingTime={0}
						playerState={playerState}
						setPlayerState={setPlayerState}
						socket={socket!}
						room_id={room_id!}
						onSetMovieState={onSetMovieState}
						playerRef={playerRef}
						participants={participants}
						showControls={showControls}
						setShowControls={setShowControls}
						count={count}
						setCount={setCount}
						playerContainerRef={playerContainerRef.current}
						setIsChatOpen={setIsChatOpen}
						isChatOpen={isChatOpen}
					/>
					<div
						className={`z-50 w-[500px] ${
							isChatOpen ? 'opacity-100' : 'absolute left-[-999px] opacity-0'
						} transition-all duration-700 ease-out`}
					>
						<Chat
							inputRef={inputRef}
							messages={messages}
							onSubmitMessage={onSubmitMessage}
							user={user}
							setIsChatOpen={setIsChatOpen}
							movieState={movieState}
							isChatOpen={isChatOpen}
						/>
					</div>
				</div>
			)}
		</>
	);
};
