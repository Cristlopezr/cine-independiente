import { useAuthStore, useCineStore } from '@/hooks';
import { Movie } from '@/interfaces';
import { cn } from '@/lib/utils';
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

	const {
		watchHistory,
		startAddingMovieTolist,
		startDeletingMovieFromList,
		userList,
		startDeletingFromWatchHistory,
	} = useCineStore();
	const { user } = useAuthStore();

	const history = watchHistory?.find(({ movie_id }) => movie_id === movie.movie_id);
	const isMovieInlist = userList.some(({ movie_id }) => movie_id === movie.movie_id);

	const onClickMovie = (movieId: string) => {
		navigate(`/movie/${movieId}`);
	};

	const onClickPlay = (movieId: string) => {
		navigate(`/movie/player/${movieId}`);
	};

	const onClickAddToList = () => {
		startAddingMovieTolist({ movie_id: movie.movie_id, user_id: user.user_id, movie });
	};

	const onClickDeleteFromList = () => {
		startDeletingMovieFromList({ movie_id: movie.movie_id, user_id: user.user_id });
	};

	const onClickDeleteFromHistory = () => {
		startDeletingFromWatchHistory({ movie_id: movie.movie_id, user_id: user.user_id });
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
				<div className='absolute w-full opacity-0 group-hover/actions:opacity-100 transition-all duration-500 ease-in-out bottom-0 flex items-center gap-3'>
					{isHistoryPage && (
						<div
							onClick={onClickDeleteFromHistory}
							className='absolute cursor-pointer hover:bg-gray-700 bg-gray-700/70 hover:ring-2 hover:ring-[hsl(258,84%,59%)] flex items-center justify-center rounded-full w-10 h-10 bottom-20 left-1/2 -translate-x-1/2'
						>
							<BsX className='w-full text-4xl' />
						</div>
					)}
					<div className='absolute flex items-center justify-center bottom-5 right-[68px] w-10 h-10 z-10 bg-white/90 cursor-pointer hover:bg-white hover:ring-2 rounded-full hover:ring-[hsl(258,84%,59%)]'>
						<RiPlayFill
							onClick={() => onClickPlay(movie.movie_id)}
							className='w-full text-2xl text-black'
						/>
					</div>
					{isMovieInlist ? (
						<div
							onClick={onClickDeleteFromList}
							className='absolute bg-white/90 flex items-center justify-center bottom-5 right-5 w-10 h-10 z-1 cursor-pointer hover:bg-white hover:ring-2 rounded-full hover:ring-[hsl(258,84%,59%)]'
						>
							<BsCheck2 className='w-full text-black text-2xl' />
						</div>
					) : (
						<div className='absolute bottom-5 right-5 w-10 h-10 z-10 flex items-center justify-center bg-white/90 cursor-pointer hover:bg-white hover:ring-2 rounded-full hover:ring-[hsl(258,84%,59%)]'>
							<BsPlusLg onClick={onClickAddToList} className='w-full text-black text-2xl' />
						</div>
					)}
				</div>
			</div>
			<p className='mx-2 pt-1'>{movie.title}</p>
		</div>
	);
};
