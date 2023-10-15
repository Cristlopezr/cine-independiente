import { cineApi } from '@/api';
import {
	CleanUploadMovieFormValues,
	DetailedMovie,
	Director,
	Genre,
	GenreWithMovies,
	Movie,
	UpdateMovie,
	UpdateMovieTeam,
	WatchHistory,
} from '@/interfaces';

export const cineApiSlice = cineApi.injectEndpoints({
	endpoints: builder => ({
		getGenres: builder.query<Genre[], void>({
			query: () => '/movie/get-genres',
		}),
		getGenresWithMovies: builder.query<GenreWithMovies[], void>({
			query: () => '/movie/get-genres-movies',
			providesTags:["movie"]
		}),
		getMovies: builder.query<Movie[], string>({
			query: data => `/movie/get-movies?q=${data}`,
			providesTags:["movie"]
		}),
		getMoviesByGenre: builder.query<Movie[], string>({
			query: id => `/movie/get-movies-by-genre/${id}`,
			providesTags:["movie"]
		}),
		getMovie: builder.query<{ movie: DetailedMovie }, string>({
			query: id => `/movie/movie/${id}`,
		}),
		getMoviesByUser: builder.query<{ userMovies: Movie[] }, string>({
			query: id => `/movie/get-movies-by-user/${id}`,
			providesTags:["movie"]
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
		getWatchHistory: builder.query<{ watchHistory: WatchHistory[] }, string>({
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
		updateMovie: builder.mutation<{msg:string, updateMovie:Movie}, {user_id_date:string, movie_id:string, data:UpdateMovie}>({
			query: data => {		
				return {
					url: '/movie/update-movie',
					method: 'PUT',
					body: data,
				};
			},
			onQueryStarted: async ({movie_id,...data}, { dispatch, queryFulfilled }) => {
				const patchResult = dispatch(
					cineApiSlice.util.updateQueryData('getMovie', movie_id, (draft) => {
					  Object.assign(draft.movie, data.data)
					})
				  )
				  try {
					await queryFulfilled
				  } catch {
					patchResult.undo()
			}},
			invalidatesTags:["movie"]
		}),
		updateDirectors: builder.mutation<{msg:string, updatedDirectors:Director[]}, {movie_id:string,movie:DetailedMovie, directors:UpdateMovieTeam[]}>({
			query: data => {		
				return {
					url: '/director/update-director',
					method: 'PUT',
					body: data,
				};
			},
			onQueryStarted: async ({movie}, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled
					dispatch(
					  cineApiSlice.util.upsertQueryData('getMovie', movie.movie_id, {movie:{
						...movie,
						directors:data.updatedDirectors
					  }})
					)
				  } catch {}
			
			}})
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
	useLazyGetWatchHistoryQuery,
	useGetMoviesByUserQuery,
	useUpdateMovieMutation,
	useUpdateDirectorsMutation
} = cineApiSlice;
