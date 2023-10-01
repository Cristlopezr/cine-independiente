import { cineApi } from '@/api';
import { CleanUploadMovieFormValues, Genre, Movie } from '@/interfaces';

export const cineApiSlice = cineApi.injectEndpoints({
	endpoints: builder => ({
		getGenres: builder.query<Genre[], void>({
			query: () => '/movie/get-genres',
		}),
		getMovies: builder.query<Movie[], { genre?: string; section?: string}>({
			query: queryParameters => `/movie/get-movies?section=${queryParameters.section}&genre=${queryParameters.genre}`,
		}),
		getMovie: builder.query<{movie:Movie}, string>({
			query: id => `/movie/movie/${id}`,
		}),
		uploadMovieInfo: builder.mutation<string, CleanUploadMovieFormValues>({
			query: data => {
				const { writers, directors, cast, genres, ...movie } = data;
				const formData = {
					writers,
					directors,
					cast,
					genres,
					movie,
				};

				return {
					url: '/movie',
					method: 'POST',
					body: formData,
				};
			},
		}),
		updateMovieInfo: builder.mutation<string, CleanUploadMovieFormValues>({
			query: data => {
				const { writers, directors, cast, genres, ...movie } = data;
				const formData = {
					writers,
					directors,
					cast,
					genres,
					movie,
				};

				return {
					url: '/movie/update-first-movie',
					method: 'PUT',
					body: formData,
				};
			},
		}),
	}),
});

export const { useGetGenresQuery, useUploadMovieInfoMutation, useGetMoviesQuery, useUpdateMovieInfoMutation, useGetMovieQuery } = cineApiSlice;
