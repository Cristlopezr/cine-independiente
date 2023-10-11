import { DetailedMovie, Movie } from '@/interfaces';
import { Header } from '.';
import { GoPlay } from 'react-icons/go';
import { BsPlusLg } from 'react-icons/bs';

interface MovieInfoProps {
	movie: DetailedMovie | Movie;
	onClickPlay: (id: string) => void;
}

export const MovieInfo = ({ movie, onClickPlay }: MovieInfoProps) => {
	return (
		<section className='px-5 sm:px-14 absolute -bottom-[30%] min-[450px]:-bottom-[15%] sm:-bottom-[5%] min-[500px]:px-10 md:bottom-[5%] w-full sm:w-4/5 lg:w-2/3 2xl:w-[60%]'>
			<div className='z-10 flex flex-col gap-[5px] sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5'>
				<Header title={movie.title} productionYear={movie.productionYear} />
				<section className='flex items-center gap-7'>
					<GoPlay
						onClick={() => onClickPlay(movie.movie_id)}
						className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-primary/80 cursor-pointer hover:text-primary'
					/>
					<BsPlusLg className='text-xl sm:text-2xl lg:text-3xl text-primary/80 cursor-pointer hover:text-primary' />
				</section>
				<p className='text-xs sm:text-sm md:text-xl'>{movie.synopsis}</p>
				{'genres' in movie && (
					<ul className='flex text-xs gap-5 sm:text-sm'>
						{movie.genres.map(({ name, genre_id }) => (
							<li key={genre_id} className='flex items-center gap-2'>
								<div className='w-1 h-1 bg-white/80 rounded-full'></div>
								{name}
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
};
