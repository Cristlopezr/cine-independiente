import Slider from 'react-slick';
import { MovieCarouselItem } from '.';
import React from 'react';
import { useGetMoviesQuery } from '@/store/cine';
import { Skeleton } from '@/components/ui';
import { Settings } from '@/interfaces';

type MovieCarouselProps = {
	title: string;
	genre: string;
	aspect: 'aspect-[9/14]' | 'aspect-[16/9]' | 'aspect-[4/3]';
	settings: Readonly<Settings>;
};

const skeletons = Array.from({ length: 8 });

export const MovieCarousel = ({ genre, title, aspect, settings }: MovieCarouselProps) => {
	const { data: movies, /* isError */ isFetching } = useGetMoviesQuery(genre);

	return (
		<div>
			<p className='mx-2 p-1 font-bold text-lg'>{title}</p>
			{isFetching && (
				<Slider {...settings}>
					{skeletons.map((_, i) => (
						<React.Fragment key={i}>
							<Skeleton className={`${aspect} m-2`} />
						</React.Fragment>
					))}
				</Slider>
			)}
			{!isFetching && (
				<Slider {...settings}>
					{movies?.map((movie, i) => (
						<div key={i} className='px-[8px]'>
							<MovieCarouselItem movie={movie} className={aspect} />
						</div>
					))}
				</Slider>
			)}
		</div>
	);
};
