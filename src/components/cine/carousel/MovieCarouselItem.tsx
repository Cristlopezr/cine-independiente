import { useAuthStore } from '@/hooks';
import { Movie } from '@/interfaces';
import { cn } from '@/lib/utils';
import {
	useAddMovieToUserListMutation,
	useDeleteMovieFromUserListMutation,
	useDeleteMovieFromWatchHistoryMutation,
	useGetUserListQuery,
	useGetWatchHistoryQuery,
} from '@/store/cine';
import { BsCheck2, BsPlusLg, BsX } from 'react-icons/bs';
import { RiPlayFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export const MovieCarouselItem = ({
	className,
	movie,
	isHistoryPage,
}: {
	className?: string;
	movie: Movie;
	isHistoryPage?: boolean;
}) => {
	const navigate = useNavigate();

	const { user } = useAuthStore();

	const { data: watchHistory } = useGetWatchHistoryQuery(user.user_id);
	const { data: userList } = useGetUserListQuery(user.user_id);
	const history = watchHistory?.watchHistory?.find(({ movie_id }) => movie_id === movie.movie_id);
	const isMovieInlist = userList?.userList.some(({ movie_id }) => movie_id === movie.movie_id);
	const [addMovieToList] = useAddMovieToUserListMutation();
	const [deleteFromList] = useDeleteMovieFromUserListMutation();
	const [deleteFromWatchHistory] = useDeleteMovieFromWatchHistoryMutation();

	const onClickMovie = (movieId: string) => {
		navigate(`/movie/${movieId}`);
	};

	const onClickPlay = (movieId: string) => {
		navigate(`/movie/player/${movieId}`);
	};

	const onClickAddToList = async () => {
		await addMovieToList({ user_id: user.user_id, movie });
	};

	const onClickDeleteFromList = async () => {
		await deleteFromList({ user_id: user.user_id, movie_id: movie.movie_id });
	};

	const onClickDeleteFromHistory = async () => {
		await deleteFromWatchHistory({ user_id: user.user_id, movie_id: movie.movie_id });
	};

	return (
		<div className='relative group/actions'>
			<div className='relative w-fit h-fit'>
				<div
					onClick={() => onClickMovie(movie.movie_id)}
					className='relative my-1 rounded-md cursor-pointer'
				>
					<div className='absolute opacity-0 group-hover/actions:opacity-100 -top-[3px] -bottom-[3px] -left-[3px] -right-[3px] group-hover/actions:border-[hsl(258,84%,59%)] border-[2px] rounded-md transition-all duration-300 ease-in-out'></div>
					<div className='relative overflow-hidden rounded-sm'>
						<div className='absolute top-0 bottom-0 left-0 right-0 bg-black/20 rounded-md group-hover/actions:bg-transparent transition-all duration-300 ease-in-out'></div>
						<img
							className={cn('aspect-[16/9] w-full object-cover', className)}
							src={movie.imageUrl}
						/>
						{!!history?.viewingTime && (
							<div className='h-[5px] w-full absolute bottom-0 bg-[hsl(237,83%,80%,0.2)]'></div>
						)}
						{!!history?.viewingTime ? (
							<div
								className='h-[5px] absolute bottom-0 bg-white'
								style={{ width: `${(history.viewingTime / movie.duration) * 100}%` }}
							></div>
						) : null}
					</div>
				</div>
				{isHistoryPage && (
					<div className='opacity-0 group-hover/actions:opacity-100 transition-all duration-500 ease-in-out '>
						<div
							onClick={onClickDeleteFromHistory}
							className='absolute w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 cursor-pointer top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 hover:bg-gray-700 bg-gray-700/70 hover:ring-2 hover:ring-[hsl(258,84%,59%)] flex items-center justify-center rounded-full'
						>
							<BsX className='w-full text-4xl' />
						</div>
					</div>
				)}
				<div className='absolute opacity-0 group-hover/actions:opacity-100 transition-all duration-500 ease-in-out flex items-center justify-between w-fit gap-2 bottom-5 right-5'>
					<div className='w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-white/90 flex items-center justify-center z-1 cursor-pointer hover:bg-white hover:ring-2 rounded-full hover:ring-[hsl(258,84%,59%)]'>
						<RiPlayFill
							onClick={() => onClickPlay(movie.movie_id)}
							className='w-full text-black md:text-2xl'
						/>
					</div>
					{isMovieInlist ? (
						<div
							onClick={onClickDeleteFromList}
							className='w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-white/90 flex items-center justify-center z-1 cursor-pointer hover:bg-white hover:ring-2 rounded-full hover:ring-[hsl(258,84%,59%)]'
						>
							<BsCheck2 className='w-full text-black md:text-2xl' />
						</div>
					) : (
						<div className='w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-white/90 flex items-center justify-center z-1 cursor-pointer hover:bg-white hover:ring-2 rounded-full hover:ring-[hsl(258,84%,59%)]'>
							<BsPlusLg onClick={onClickAddToList} className='w-full text-black md:text-2xl' />
						</div>
					)}
				</div>
			</div>
			<p className='mx-2 pt-1'>{movie.title}</p>
		</div>
	);
};
