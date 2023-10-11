import { DetailedMovie } from '@/interfaces';

export const MovieDetails = ({ movie }: { movie: DetailedMovie }) => {
	return (
		<section className='mt-16 md:mt-0 px-5 grid grid-cols-2 gap-y-10 min-[500px]:px-10 sm:px-14'>
			<div>
				<p className='font-semibold md:text-xl'>Directores</p>
				<ul className='flex flex-col gap-1'>
					{movie.directors.map(({ name, director_id }) => (
						<li key={director_id}>{name}</li>
					))}
				</ul>
			</div>
			<div>
				<p className='font-semibold md:text-xl'>Guionistas</p>
				<ul className='flex flex-col gap-1'>
					{movie.writers.map(({ name, writer_id }) => (
						<li key={writer_id}>{name}</li>
					))}
				</ul>
			</div>
			<div>
				<p className='font-semibold md:text-xl'>Elenco</p>
				<ul className='flex flex-col gap-1'>
					{movie.cast.map(({ name, actor_id }) => (
						<li key={actor_id}>{name}</li>
					))}
				</ul>
			</div>
		</section>
	);
};
