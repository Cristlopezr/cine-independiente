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
		<section className='px-14 absolute bottom-[8%] flex flex-col gap-5 w-full sm:w-4/5 lg:w-2/3 2xl:w-[60%]'>
			<div className='z-10 flex flex-col gap-5'>
				<Header title={movie.title} productionYear={movie.productionYear} />
				<section className='flex items-center gap-7'>
					<GoPlay
						onClick={() => onClickPlay(movie.movie_id)}
						className='text-6xl text-primary/80 cursor-pointer hover:text-primary'
					/>
					<BsPlusLg className='text-3xl text-primary/80 cursor-pointer hover:text-primary' />
				</section>
				<p className='lg:text-xl'>{movie.synopsis}</p>
			</div>
		</section>
	);
};
