import Slider from 'react-slick';
import { MovieCarouselItem } from '.';
import { Movie, Settings } from '@/interfaces';

type MovieCarouselProps = {
	title: string;
	aspect: 'aspect-[9/14]' | 'aspect-[16/9]' | 'aspect-[4/3]';
	settings: Readonly<Settings>;
	movies: Movie[];
};

export const MovieCarousel = ({ title, aspect, settings, movies }: MovieCarouselProps) => {
	return (
		<div>
			<p className='mx-2 p-1 font-bold text-lg'>{title}</p>
			<Slider {...settings}>
				{movies?.map(movie => (
					<div key={movie.movie_id} className='px-[8px]'>
						<MovieCarouselItem movie={movie} className={aspect} />
					</div>
				))}
			</Slider>
		</div>
	);
};
