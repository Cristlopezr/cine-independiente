import { Movie } from '@/interfaces';
import { HeaderImage } from '.';
import { GoPlay } from 'react-icons/go';
import { BsCheck2, BsPlusLg } from 'react-icons/bs';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { formatMovieTime } from '@/helpers';
import { useAuthStore, useCineStore } from '@/hooks';

interface HeaderProps {
	movie: Movie;
	onClickPlay: (id: string) => void;
	isCarousel?: boolean;
}

const gradientStyle = {
	backgroundImage: `linear-gradient(
	  hsla(224, 71.4%, 4.1%, 0) 0%, hsla(224, 71.4%, 4.1%, 0) 49.02%, 
	  hsla(224, 71.4%, 4.1%, 0.009) 52.42%, hsla(224, 71.4%, 4.1%, 0.036) 55.82%, 
	  hsla(224, 71.4%, 4.1%, 0.082) 59.22%, hsla(224, 71.4%, 4.1%, 0.15) 62.62%, 
	  hsla(224, 71.4%, 4.1%, 0.23) 66.02%, hsla(224, 71.4%, 4.1%, 0.332) 69.41%, 
	  hsla(224, 71.4%, 4.1%, 0.443) 72.81%, hsla(224, 71.4%, 4.1%, 0.557) 76.21%, 
	  hsla(224, 71.4%, 4.1%, 0.668) 79.61%, hsla(224, 71.4%, 4.1%, 0.77) 83.01%, 
	  hsla(224, 71.4%, 4.1%, 0.85) 86.41%, hsla(224, 71.4%, 4.1%, 0.918) 89.8%, 
	  hsla(224, 71.4%, 4.1%, 0.964) 93.2%, hsla(224, 71.4%, 4.1%, 0.991) 96.6%, 
	  hsla(224, 71.4%, 4.1%, 0) 100%)`,
};

export const Header = ({ movie, onClickPlay, isCarousel }: HeaderProps) => {
	const navigate = useNavigate();

	const { startAddingMovieTolist, startDeletingMovieFromList, userList } = useCineStore();
	const { user } = useAuthStore();

	const isMovieInlist = userList.some(({ movie_id }) => movie_id === movie.movie_id);
	const onClickSeeDetails = (movieId: string) => {
		navigate(`/movie/${movieId}`);
	};

	const onClickAddToList = () => {
		startAddingMovieTolist({ movie_id: movie.movie_id, user_id: user.user_id, movie });
	};

	const onClickDeleteFromList = () => {
		startDeletingMovieFromList({ movie_id: movie.movie_id, user_id: user.user_id });
	};

	return (
		<section className='font-semibold main-slider-container relative overflow-hidden'>
			<div className='absolute w-full h-[400px] -bottom-10' style={gradientStyle}></div>
			<div className='absolute w-full h-[600px] -bottom-10' style={gradientStyle}></div>
			<section className='absolute flex flex-col gap-3 bottom-10 font-semibold z-10 px-14 w-full'>
				<p className='uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl z-10 drop-shadow-[0_10px_10px_hsla(224,71.4%,4.1%,1)]'>
					{movie.title}
				</p>
				<div className='flex items-center gap-5 text-white/70 font-normal tracking-widest'>
					<p className='drop-shadow-[0_5px_5px_hsla(224,71.4%,4.1%,1)]'>
						{formatMovieTime(movie.duration)} MIN
					</p>
					<p className='drop-shadow-[0_5px_5px_hsla(224,71.4%,4.1%,1)]'>{movie.productionYear}</p>
				</div>
				<section className='flex items-center gap-7'>
					<GoPlay
						onClick={() => onClickPlay(movie.movie_id)}
						className='text-5xl md:text-6xl text-primary/80 cursor-pointer hover:text-primary'
					/>
					{isCarousel ? (
						<Button onClick={() => onClickSeeDetails(movie.movie_id)} variant='outline' size='lg'>
							Ver detalles
						</Button>
					) : (
						<>
							{isMovieInlist ? (
								<BsCheck2
									onClick={onClickDeleteFromList}
									className='text-3xl text-primary/80 cursor-pointer hover:text-primary'
								/>
							) : (
								<BsPlusLg
									onClick={onClickAddToList}
									className='text-3xl text-primary/80 cursor-pointer hover:text-primary'
								/>
							)}
						</>
					)}
				</section>
				<p className='text-base md:text-lg w-[90%] xl:w-[60%]'>
					{isCarousel ? (
						<>
							{movie.synopsis.length > 100
								? movie.synopsis.slice(0, 100) + '...'
								: movie.synopsis}
						</>
					) : (
						<>{movie.synopsis}</>
					)}
				</p>
			</section>
			<HeaderImage imageUrl={movie.imageUrl} />
		</section>
	);
};
