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
		deleteMovie: builder.mutation<{data:{deletedMovie:Movie}}, string>({
			query: id => {
				return {
					url: `/movie/movie/${id}`,
					method: 'DELETE',
				};
			},
		}),
		saveWatchHistory: builder.mutation<string, {user_id:string, movie_id:string, currentTime:number}>({
			query: data => {
				return {
					url: '/movie/save-watch-history',
					method: 'POST',
					body: data,
				};
			},
		}),
		uploadMovieInfo: builder.mutation<{createdMovie:Movie}, CleanUploadMovieFormValues>({
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

export const { useGetGenresQuery, useUploadMovieInfoMutation, useGetMoviesQuery, useUpdateMovieInfoMutation, useGetMovieQuery, useSaveWatchHistoryMutation, useDeleteMovieMutation } = cineApiSlice;
