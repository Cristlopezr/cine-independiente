import { UseFormReturn } from 'react-hook-form';

export type UploadMovieForm = UseFormReturn<
	{
		title: string;
		synopsis: string;
		productionYear: string;
		directors: {
			value: string;
		}[];
		writers: {
			value: string;
		}[];
		genres: string[];
		cast: {
			value: string;
		}[];
		movieImage?: any;
	},
	any,
	undefined
>;

export interface FormStepOneItem {
	id: 'title' | 'synopsis' | 'productionYear' | 'movieImage';
	label: string;
	type?: 'text' | 'file';
	placeholder?: string;
}
