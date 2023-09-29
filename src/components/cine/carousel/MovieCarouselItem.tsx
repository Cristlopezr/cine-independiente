import { Movie } from '@/interfaces';
import { cn } from '@/lib/utils';
import { BsFillPlayCircleFill, BsFillPlusCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export const MovieCarouselItem = ({ className, movie }: { className?: string; movie: Movie }) => {
	const navigate = useNavigate();

	const onClickMovie = (movieId: string) => {
		navigate(`/movie/${movieId}`);
	};

	return (
		<div className='relative group/actions'>
			<div
				onClick={() => onClickMovie(movie.movie_id)}
				className='relative my-1 mx-2 rounded-sm cursor-pointer'
			>
				<div className='absolute top-0 bottom-0 left-0 right-0 bg-black/20 rounded-sm group-hover/actions:bg-transparent transition-all duration-300 ease-in-out'></div>
				<div className='absolute opacity-0 group-hover/actions:opacity-100 -top-[3px] -bottom-[3px] -left-[3px] -right-[3px] group-hover/actions:border-[hsl(258,84%,59%)] border-[2px] rounded-sm transition-all duration-300 ease-in-out'></div>
				<img
					className={cn('aspect-[9/14] w-full object-cover rounded-sm', className)}
					src={movie.imageUrl}
				/>
			</div>
			<p className='mx-2 pt-1'>{movie.title}</p>
			<div className='absolute opacity-0 group-hover/actions:opacity-100 transition-all duration-500 ease-in-out bottom-12 right-5 flex items-center gap-3'>
				<BsFillPlayCircleFill className='w-9 h-9 z-10 text-white cursor-pointer' />
				<div className='absolute top-2 left-2 bg-black w-5 h-5 rounded-full'></div>
				<div className='absolute top-2 right-2 bg-black w-5 h-5 rounded-full'></div>
				<BsFillPlusCircleFill className='w-9 h-9 z-10 text-white cursor-pointer' />
			</div>
		</div>
	);
};
