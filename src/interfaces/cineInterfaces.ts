import { UseFormReturn } from 'react-hook-form';

export type Settings = {
	dots: boolean;
	infinite: boolean;
	arrows: boolean;
	speed: number;
	slidesToShow: number;
	slidesToScroll: number;
	draggable: boolean;
	nextArrow: JSX.Element | undefined;
	prevArrow: JSX.Element | undefined;
	responsive: Breakpoint[];
};

type Breakpoint = {
	breakpoint: number;
	settings: {
		slidesToShow: number;
		slidesToScroll: number;
	};
};

export type Movie = {
	movie_id: string;
	thumbnailUrl: string | null;
	imageUrl: string;
	date: string;
	title: string;
	productionYear: number;
	movieUrl: string | null;
	synopsis: string;
	user_id: string;
	enabled: boolean;
	createdAt: string;
	updatedAt: string;
};

export interface Genre {
	genre_id: string;
	name: string;
}

export type UploadMovieForm = UseFormReturn<
	{
		genres: string[];
		writers: {
			name: string;
		}[];
		directors: {
			name: string;
		}[];
		cast: {
			name: string;
		}[];
		productionYear: string;
		title: string;
		synopsis: string;
		movieImage?: any;
	},
	any,
	undefined
>;

export interface CleanUploadMovieFormValues {
	date: string | undefined;
	imageUrl: string | undefined;
	productionYear: number;
	user_id: string;
	genres: string[];
	title: string;
	synopsis: string;
	directors: {
		name: string;
	}[];
	writers: {
		name: string;
	}[];
	cast: { name: string }[];
}

export interface FormStepOneItem {
	id: 'title' | 'synopsis' | 'productionYear' | 'movieImage';
	label: string;
	type?: 'text' | 'file';
	placeholder?: string;
}
