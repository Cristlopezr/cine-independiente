import { DetailedMovie } from '@/interfaces';
import { MovieDetailsItem } from '.';

export const MovieDetails = ({ movie }: { movie: DetailedMovie }) => {
	return (
		<section className='grid grid-cols-2 gap-y-10'>
			<MovieDetailsItem text='Directores' data={movie.directors} />
			<MovieDetailsItem text='Guionistas' data={movie.writers} />
			<MovieDetailsItem text='Elenco' data={movie.cast} />
		</section>
	);
};
