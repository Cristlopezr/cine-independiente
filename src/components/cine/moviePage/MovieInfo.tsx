import { DetailedMovie, Movie } from '@/interfaces';
import { Header, MovieDetails } from '.';
import { GoPlay } from 'react-icons/go';
import { BsPlusLg } from 'react-icons/bs';

interface MovieInfoProps {
	movie: DetailedMovie | Movie;
	onClickPlay: (id: string) => void;
}

export const MovieInfo = ({ movie, onClickPlay }: MovieInfoProps) => {
	return (
		<section className='px-14 absolute top-[62%] flex flex-col gap-5 w-full sm:w-4/5 lg:w-2/3 2xl:w-[60%]'>
			<div className='absolute bg-gradient-to-bl z-0 from-transparent from-[50%] to-background -top-[50%] -bottom-20 left-0 right-0'></div>
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
				{'genres' in movie ? (
					<>
						<section className='mt-5 flex flex-col justify-center gap-5'>
							<div className='flex items-center gap-3'>
								{movie.genres.map(({ name, genre_id }) => (
									<div key={genre_id} className='flex items-center text-sm'>
										<div className='w-2 h-2 bg-primary rounded-full mr-2'></div>
										<div>{name}</div>
									</div>
								))}
							</div>
						</section>
						<MovieDetails movie={movie} />
					</>
				) : null}
			</div>
		</section>
	);
};
