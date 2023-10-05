import { Skeleton } from '@/components/ui';
import { useGetMoviesQuery } from '@/store/cine';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Slider from 'react-slick';

function RigthArrow(props: any) {
	const { onClick } = props;
	const isDisabled = onClick === null;
	return (
		<div
			className={`bg-transparent cursor-pointer absolute group/arrow transition-all duration-300 ease-in-out w-12 -right-0 rounded-sm z-10 top-1 bottom-0 flex items-center justify-center`}
			onClick={onClick}
		>
			<BsChevronRight
				className={`${isDisabled ? 'text-transparent' : 'text-primary'} ${
					isDisabled ? 'text-transparent' : 'dark:text-accent-foreground'
				} text-primary w-8 h-8 sm:w-10 sm:h-10 sm:group-hover/arrow:h-12 sm:group-hover/arrow:w-12 transition-all duration-300 ease-in-out`}
			/>
		</div>
	);
}

function LeftArrow(props: any) {
	const { onClick, currentSlide } = props;
	const isDisabled = currentSlide === 0;

	return (
		<div
			className={`bg-transparent cursor-pointer absolute group/arrow transition-all duration-300 ease-in-out w-12 left-0 rounded-sm z-10 top-1 bottom-0 flex items-center justify-center`}
			onClick={onClick}
		>
			<BsChevronLeft
				className={`${isDisabled ? 'text-transparent' : 'text-primary'} ${
					isDisabled ? 'text-transparent' : 'dark:text-accent-foreground'
				} text-primary w-8 h-8 sm:w-10 sm:h-10 sm:group-hover/arrow:h-12 sm:group-hover/arrow:w-12 transition-all duration-300 ease-in-out`}
			/>
		</div>
	);
}

const settings = {
	dots: true,
	infinite: false,
	autoplay: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	nextArrow: <RigthArrow />,
	prevArrow: <LeftArrow />,
	dotsClass: 'slick-dots',
	customPaging: function () {
		return (
			<div className='-mt-7 flex items-center justify-center'>
				<div className='w-2 h-2 bg-white/50 rounded-full'></div>
			</div>
		);
	},
};

export const MainCarousel = () => {
	const {
		data: movies,
		/* isError, */
		isFetching,
	} = useGetMoviesQuery({
		genre: 'Fantasia y Ciencia ficción',
	});

	if (isFetching) {
		return (
			<div className='relative w-full'>
				<Slider {...settings}>
					<div className='w-full main-slider-container relative h-screen'>
						<Skeleton className='w-full main-slider-container h-screen' />
						<div className='absolute bg-gradient-to-b from-transparent from-70% to-background -top-2 -bottom-2 -left-2 -right-2'></div>
					</div>
				</Slider>
			</div>
		);
	}

	return (
		<div className='relative w-full min-h-[]'>
			<Slider {...settings}>
				{movies?.map(movie => (
					<div
						key={movie.movie_id}
						className='w-full main-slider-container relative overflow-hidden'
					>
						<img className='w-full' src={movie.imageUrl} alt='' />
						<div className='absolute bg-gradient-to-b from-transparent from-75% to-background top-0 bottom-0 left-0 right-0'></div>
					</div>
				))}
			</Slider>
		</div>
	);
};
