import { Movie } from '@/interfaces';
import { HeaderImage } from '.';
import { GoPlay } from 'react-icons/go';
import { BsPlusLg } from 'react-icons/bs';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

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

	const onClickSeeDetails = (movieId: string) => {
		navigate(`/movie/${movieId}`);
	};

	return (
		<section className='font-semibold main-slider-container relative overflow-hidden'>
			<div className='absolute w-full h-[700px] -bottom-10' style={gradientStyle}></div>
			<div className='absolute w-full h-[600px] -bottom-10' style={gradientStyle}></div>
			<div className='absolute w-full h-[600px] -bottom-10' style={gradientStyle}></div>
			<section className='absolute flex flex-col gap-3 bottom-10 font-semibold z-10 px-14 w-full'>
				<p className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>{movie.title}</p>
				<p className='text-gray-300 font-thin'>{movie.productionYear}</p>
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
						<BsPlusLg className='text-3xl text-primary/80 cursor-pointer hover:text-primary' />
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
