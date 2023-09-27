import { UseFormReturn } from 'react-hook-form';

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
