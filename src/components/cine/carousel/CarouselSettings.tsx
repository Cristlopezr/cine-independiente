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
				} w-8 h-8 sm:w-10 sm:h-10 group-hover/arrow:h-12 group-hover/arrow:w-12 transition-all duration-300 ease-in-out`}
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
				} w-8 h-8 sm:w-10 sm:h-10 group-hover/arrow:h-12 group-hover/arrow:w-12 transition-all duration-300 ease-in-out`}
			/>
		</div>
	);
}

export const settings914 = {
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
			breakpoint: 1546,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5,
			},
		},
		{
			breakpoint: 1250,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			},
		},
		{
			breakpoint: 900,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 587,
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
	slidesToShow: 5,
	slidesToScroll: 5,
	draggable: true,
	nextArrow: <RigthArrow />,
	prevArrow: <LeftArrow />,
	responsive: [
		{
			breakpoint: 1600,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			},
		},
		{
			breakpoint: 1213,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 780,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 421,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};

export function RigthGenreArrow(props: any) {
	const { onClick, isRightArrowVisible } = props;
	if (!isRightArrowVisible) return;
	const isDisabled = onClick === null;

	return (
		<div
			className={`cursor-pointer absolute group/arrow transition-all duration-300 ease-in-out w-fit -right-5 rounded-sm z-10 top-1 bottom-[5px] flex items-center justify-center`}
			onClick={onClick}
		>
			<BsChevronRight
				className={`${isDisabled ? 'text-transparent' : 'text-primary'} ${
					isDisabled ? 'text-transparent' : 'dark:text-accent-foreground'
				} w-5 h-5 group-hover/arrow:h-7 group-hover/arrow:w-7 transition-all duration-300 ease-in-out`}
			/>
		</div>
	);
}

export function LeftGenreArrow(props: any) {
	const { onClick, currentSlide } = props;
	const isDisabled = currentSlide === 0;
	return (
		<div
			className={`bg-transparent cursor-pointer absolute group/arrow transition-all duration-300 ease-in-out w-fit -left-5 rounded-sm z-10 top-1 bottom-[5px] flex items-center justify-center`}
			onClick={onClick}
		>
			<BsChevronLeft
				className={`${isDisabled ? 'text-transparent' : 'text-primary'} ${
					isDisabled ? 'text-transparent' : 'dark:text-accent-foreground'
				} w-5 h-5 group-hover/arrow:h-7 group-hover/arrow:w-7 transition-all duration-300 ease-in-out`}
			/>
		</div>
	);
}

export const settingsGenre = {
	className: 'slider variable-width',
	dots: true,
	infinite: false,
	swipe: false,
	slidesToShow: 1,
	slidesToScroll: 2,
	variableWidth: true,
	prevArrow: <LeftGenreArrow />,
};
