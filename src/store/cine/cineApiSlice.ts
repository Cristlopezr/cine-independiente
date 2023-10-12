import { cineApi } from '@/api';
import { CleanUploadMovieFormValues, DetailedMovie, Genre, GenreWithMovies, Movie, WatchHistory } from '@/interfaces';

export const cineApiSlice = cineApi.injectEndpoints({
	endpoints: builder => ({
		getGenres: builder.query<Genre[], void>({
			query: () => '/movie/get-genres',
		}),
		getGenresWithMovies: builder.query<GenreWithMovies[], void>({
			query: () => '/movie/get-genres-movies',
		}),
		getMovies: builder.query<Movie[], string>({
			query: data => `/movie/get-movies?q=${data}`,
		}),
		getMoviesByGenre: builder.query<Movie[], string>({
			query: id => `/movie/get-movies-by-genre/${id}`,
		}),
		getMovie: builder.query<{ movie: DetailedMovie }, string>({
			query: id => `/movie/movie/${id}`,
		}),
		deleteMovie: builder.mutation<{ data: { deletedMovie: Movie } }, string>({
			query: id => {
				return {
					url: `/movie/movie/${id}`,
					method: 'DELETE',
				};
			},
		}),
		saveWatchHistory: builder.mutation<string,{ user_id: string; movie_id: string; currentTime: number }>({
			query: data => {
				return {
					url: '/movie/save-watch-history',
					method: 'POST',
					body: data,
				};
			},
		}),
		getWatchHistory: builder.query<{watchHistory:WatchHistory[]}, string>({
			query: id => `/movie/get-watch-history/${id}`,
		}),
		uploadMovieInfo: builder.mutation<{ createdMovie: Movie }, CleanUploadMovieFormValues>({
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

export const {
	useGetGenresQuery,
	useUploadMovieInfoMutation,
	useGetMoviesQuery,
	useUpdateMovieInfoMutation,
	useGetMovieQuery,
	useSaveWatchHistoryMutation,
	useDeleteMovieMutation,
	useGetMoviesByGenreQuery,
	useGetGenresWithMoviesQuery,
	useGetWatchHistoryQuery,
	useLazyGetWatchHistoryQuery
} = cineApiSlice;
