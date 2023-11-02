import { VideoElWatchParty } from '@/components/cine/roomPage';
import { Avatar, AvatarFallback, AvatarImage, Button, Loading, Separator } from '@/components/ui';
import { formatMovieTime } from '@/helpers';
import { useAuthStore } from '@/hooks';
import { User } from '@/interfaces';
import { useGetMovieQuery } from '@/store/cine';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

const MAX_PARTICIPANTS = 3;

const pageText = {
	pageTitle: 'Ver en grupo',
	inviteText: 'Invita hasta 2 amigos a tu grupo.',
	leaveGroupButton: 'Salir del grupo',
	startWatchingButton: 'Empezar a ver',
	roomComplete: 'La sala está completa.',
};

type RoomStatus = 'playing' | 'waiting';
type MovieState = 'started' | 'not-started';
export const Room = () => {
	const { movie_id, room_id } = useParams();
	const { user } = useAuthStore();
	const [participants, setParticipants] = useState<User[]>([]);
	const [movieState, setMovieState] = useState<MovieState>('not-started');
	const [socket, setSocket] = useState<Socket>();
	const [roomStatus, setRoomStatus] = useState<RoomStatus>('waiting');
	const navigate = useNavigate();
	const { data, isError, isFetching } = useGetMovieQuery(movie_id!);
	const [playerState, setPlayerState] = useState({ viewingTime: 0 });

	useEffect(() => {
		const socket = io('http://localhost:8081', {
			transports: ['websocket'],
		});
		setSocket(socket);
		socket.on('connect', () => {
			socket.emit('CLIENT:user-joined-room', { room_id, user: { ...user } });
		});

		socket.on('SERVER:participants', ({ participants }) => {
			console.log(participants);
			setParticipants(prevParticipants => {
				if (participants.length > MAX_PARTICIPANTS) {
					return [...prevParticipants];
				}
				return [...participants];
			});
		});

		socket.on('SERVER:started-movie', ({ movie_state }) => {
			console.log('asd');
			setMovieState(movie_state);
		});

		socket.on('SERVER:room-status', ({ room_status }) => {
			setRoomStatus(room_status);
		});

		socket.on('disconnect', () => {
			// Aquí puedes realizar acciones cuando un usuario se desconecta
			console.log('Usuario desconectado');
			// Por ejemplo, puedes actualizar la lista de participantes
			// y realizar cualquier otra lógica necesaria.
		});
		//!Enviar el roomId, user_id, movie_id
		//!OnUserJoinRoom setear los participantes
		return () => {
			socket.off('SERVER:started-movie');
			socket.off('SERVER:participants');
			/* 	socket.off('SERVER:room-status'); */
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
		/* 	const remainingParticipants = participants.filter(
			participant => participant.user_id !== user.user_id
		);
		setParticipants(remainingParticipants);
		if (socket === undefined) return;
		socket.emit('CLIENT:participant-left-room', remainingParticipants); */
		//!Setear participantes y enviar participantes
		//!Se setea solo on disconect del server
	};

	const onClickPlay = () => {
		console.log('play');
		socket?.emit('CLIENT:start-movie', { room_id, room_status: 'playing', movie_state: 'started' });
		//!Change room status and send room status
	};

	const { movie } = data!;

	const { viewingTime } = playerState;

	console.log({ roomStatus });
	return (
		<>
			{movieState === 'not-started' ? (
				<div className='mt-[100px] px-5 sm:px-10'>
					<h1 className='text-2xl sm:px-5 font-semibold'>{pageText.pageTitle}</h1>
					<Separator className='my-5' />
					<div className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
						<div className='flex flex-col w-full md:max-w-[600px] sm:px-5 gap-10'>
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
							{participants.length === MAX_PARTICIPANTS && <div>{pageText.roomComplete}</div>}
							{roomStatus === 'playing' && (
								<div>La película ya empezó, unete haciendo clic en empezar a ver.</div>
							)}
							<div className='flex gap-10 items-center'>
								{participants.map(({ user_id, name, avatarUrl }, i) => (
									<span
										key={user_id}
										className={`flex flex-col items-center ${
											i === 0 ? 'order-2' : i === 1 ? 'order-1' : 'order-3'
										}`}
									>
										<Avatar
											className={`${
												i === 0 ? 'w-[10rem] h-[10rem]' : 'w-[8rem] h-[8rem]'
											} border-4 border-border-second`}
										>
											<AvatarImage src={avatarUrl ? avatarUrl : undefined} />
											<AvatarFallback className='text-4xl'>
												{name.slice(0, 1)}
											</AvatarFallback>
										</Avatar>
										<p className='hidden md:block text-white'>{name}</p>
									</span>
								))}
							</div>
							<div className='flex flex-col gap-1 items-center w-full'>
								<Button onClick={onClickPlay} className='w-fit'>
									{pageText.startWatchingButton}
								</Button>
								<p className='text-xl font-semibold'>{pageText.inviteText}</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<VideoElWatchParty movie={movie} viewingTime={viewingTime} />
			)}
		</>
	);
};
