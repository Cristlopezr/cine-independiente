import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

function RigthArrow(props: any) {
	const { onClick } = props;

	const isDisabled = onClick === null;

	return (
		<div
			className={`bg-transparent cursor-pointer absolute group/arrow transition-all duration-300 ease-in-out w-12 -right-9 rounded-sm z-10 top-1 bottom-8 flex items-center justify-center`}
			onClick={onClick}
		>
			<BsChevronRight
				className={`${isDisabled ? 'text-transparent' : 'text-primary'} ${
					isDisabled ? 'text-transparent' : 'dark:text-accent-foreground'
				} w-10 h-10 group-hover/arrow:h-12 group-hover/arrow:w-12 transition-all duration-300 ease-in-out`}
			/>
		</div>
	);
}

function LeftArrow(props: any) {
	const { onClick, currentSlide } = props;
	const isDisabled = currentSlide === 0;
	return (
		<div
			className={`bg-transparent cursor-pointer absolute group/arrow transition-all duration-300 ease-in-out w-12 -left-9 rounded-sm z-10 top-1 bottom-8 flex items-center justify-center`}
			onClick={onClick}
		>
			<BsChevronLeft
				className={`${isDisabled ? 'text-transparent' : 'text-primary'} ${
					isDisabled ? 'text-transparent' : 'dark:text-accent-foreground'
				} w-10 h-10 group-hover/arrow:h-12 group-hover/arrow:w-12 transition-all duration-300 ease-in-out`}
			/>
		</div>
	);
}

export const settings914 = {
	dots: false,
	infinite: false,
	arrows: true,
	speed: 500,
	slidesToShow: 8,
	slidesToScroll: 8,
	draggable: true,
	nextArrow: <RigthArrow />,
	prevArrow: <LeftArrow />,
	responsive: [
		{
			breakpoint: 1280,
			settings: {
				slidesToShow: 6,
				slidesToScroll: 6,
			},
		},
		{
			breakpoint: 1100,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 440,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
	],
};

export const settings169 = {
	dots: false,
	infinite: false,
	arrows: true,
	speed: 500,
	slidesToShow: 6,
	slidesToScroll: 6,
	draggable: true,
	nextArrow: <RigthArrow />,
	prevArrow: <LeftArrow />,
	responsive: [
		{
			breakpoint: 1600,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5,
			},
		},
		{
			breakpoint: 1258,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			},
		},
		{
			breakpoint: 954,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 650,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
	],
};