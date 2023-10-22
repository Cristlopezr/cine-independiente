import { Movie } from '@/interfaces';
import { HeaderImage } from '.';
import { GoPlay } from 'react-icons/go';
import { BsCheck2, BsPlusLg } from 'react-icons/bs';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { formatMovieTime } from '@/helpers';
import { useAddMovieToUserListMutation, useDeleteMovieFromUserListMutation } from '@/store/cine';
import { useAuthStore } from '@/hooks';

interface HeaderProps {
	movie: Movie;
	onClickPlay: (id: string) => void;
	isCarousel?: boolean;
	isMovieInlist?: boolean;
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

export const Header = ({ movie, onClickPlay, isCarousel, isMovieInlist }: HeaderProps) => {
	const navigate = useNavigate();
	const [addMovieToList] = useAddMovieToUserListMutation();
	const [deleteMovieFromList] = useDeleteMovieFromUserListMutation();
	const { user } = useAuthStore();

	const onClickSeeDetails = (movieId: string) => {
		navigate(`/movie/${movieId}`);
	};

	const onClickAddToList = async () => {
		try {
			await addMovieToList({ user_id: user.user_id, movie });
		} catch (error) {
			console.log(error);
		}
	};

	const onClickDeleteFromList = async () => {
		try {
			await deleteMovieFromList({ user_id: user.user_id, movie_id: movie.movie_id });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className='font-semibold main-slider-container relative overflow-hidden'>
			<div className='absolute w-full h-[400px] -bottom-10' style={gradientStyle}></div>
			<div className='absolute w-full h-[600px] -bottom-10' style={gradientStyle}></div>
			<div className='bg-gradient-to-r from-background pointer-events-none from-0% absolute -top-36 bottom-0 -left-52 right-[80%]'></div>
			<section className='absolute flex flex-col gap-2 lg:gap-3 bottom-10 font-semibold z-10 ps-10 md:px-14 w-full'>
				<p className='uppercase text-2xl md:text-3xl lg:text-4xl xl:text-6xl z-10 drop-shadow-[0_10px_10px_hsla(224,71.4%,4.1%,1)]'>
					{movie.title}
				</p>
				<div className='flex text-xs md:text-base items-center gap-5 text-white/70 font-normal tracking-widest'>
					<p className='drop-shadow-[0_5px_5px_hsla(224,71.4%,4.1%,1)]'>
						{formatMovieTime(movie.duration)} MIN
					</p>
					<p className='drop-shadow-[0_5px_5px_hsla(224,71.4%,4.1%,1)]'>{movie.productionYear}</p>
				</div>
				<section className='flex items-center gap-7'>
					<GoPlay
						onClick={() => onClickPlay(movie.movie_id)}
						className='text-4xl md:text-5xl xl:text-6xl text-primary/80 cursor-pointer hover:text-primary'
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
				<p className='text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg w-[90%] xl:w-[60%]'>
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
