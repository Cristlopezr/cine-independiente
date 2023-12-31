import { UseFormReturn } from 'react-hook-form';

export interface DetailedMovie {
	movie_id: string;
	user_id_date: string;
	thumbnailUrl: null;
	imageUrl: string;
	date: string;
	title: string;
	productionYear: number;
	movieUrl: string;
	synopsis: string;
	user_id: string;
	enabled: boolean;
	explicitContent: boolean;
	duration: number;
	createdAt: string;
	updatedAt: string;
	cast: Cast[];
	directors: Director[];
	genres: Genre[];
	writers: Writer[];
}

export interface Cast {
	actor_id: string;
	name: string;
	movie_id: string;
}

export interface Director {
	director_id: string;
	name: string;
	movie_id: string;
}

export interface Genre {
	genre_id: string;
	name: string;
}

export interface GenreWithMovies {
	genre_id: string;
	name: string;
	movies: Movie[];
}

export interface Writer {
	writer_id: string;
	name: string;
	movie_id: string;
}

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
	user_id_date: string;
	explicitContent: boolean;
	duration: number;
};

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
	imageUrl: string | undefined;
	productionYear: number;
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
	user_id_date: string;
	user_id: string;
}

export interface UserWatchParty {
	user_id: string;
	name: string;
	lastname: string;
	email: string;
	emailVerified: boolean;
	avatarUrl?: string;
	user_movie_state?: string;
	userTs?: number;
	socket_id?: string;
	leader?: boolean;
	color?:string;
}

export interface InitialMovie {
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
	enabled: boolean;
	explicitContent: boolean;
	user_id_date: string;
	duration: number;
}

export interface FormStepOneItem {
	id: 'title' | 'synopsis' | 'productionYear' | 'movieImage';
	label: string;
	type?: 'text' | 'file';
	placeholder?: string;
}

export interface WatchHistory {
	movie_id: string;
	updatedAt: string;
	user_id: string;
	viewingTime: number;
	movie: Movie;
}

export interface UserList {
	movie_id: string;
	updatedAt: string;
	user_id: string;
	movie: Movie;
}

export interface UpdateMovie {
	thumbnailUrl?: string | null;
	imageUrl?: string;
	title?: string;
	productionYear?: number;
	synopsis?: string;
	enabled?: boolean;
}

export interface UpdateMovieTeam {
	name: string;
}

export interface RecommendedMovie {
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
	user_id_date: string;
	explicitContent: boolean;
	duration: number;
	genres: Genre[];
}
