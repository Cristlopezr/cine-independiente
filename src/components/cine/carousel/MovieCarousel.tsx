import Slider from 'react-slick';
import { MovieCarouselItem } from '.';
import { Movie, Settings } from '@/interfaces';
import { BsChevronRight } from 'react-icons/bs';

type MovieCarouselProps = {
	title: string;
	aspect: 'aspect-[9/14]' | 'aspect-[16/9]' | 'aspect-[4/3]';
	settings: Readonly<Settings>;
	movies: Movie[];
	clickable?: boolean;
	onClick?: () => void;
};

export const MovieCarousel = ({
	title,
	aspect,
	settings,
	movies,
	clickable,
	onClick,
}: MovieCarouselProps) => {
	return (
		<div>
			{clickable ? (
				<div
					onClick={onClick}
					className='flex text-white hover:text-white/80 items-center gap-3 cursor-pointer w-fit'
				>
					<p className='mx-2 p-1 font-bold text-lg'>{title}</p>
					<BsChevronRight />
				</div>
			) : (
				<p className='mx-2 p-1 font-bold text-lg'>{title}</p>
			)}

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
