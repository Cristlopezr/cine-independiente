import { DetailedMovie } from '@/interfaces';

export const MovieDetails = ({ movie }: { movie: DetailedMovie }) => {
	return (
		<section className='flex flex-col gap-10 px-5 md:px-14'>
			<div className='z-10 flex flex-col gap-5'>
				<ul className='flex text-xs flex-wrap gap-5 sm:text-sm'>
					{movie.genres.map(({ name, genre_id }) => (
						<li key={genre_id} className='flex items-center gap-2'>
							<div className='w-1 h-1 bg-white/80 rounded-full'></div>
							{name}
						</li>
					))}
				</ul>
			</div>
			<section className='grid grid-cols-2 gap-y-10'>
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
		</section>
	);
};
