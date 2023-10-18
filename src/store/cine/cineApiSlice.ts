import { cineApi } from '@/api';
import {
	Cast,
	CleanUploadMovieFormValues,
	DetailedMovie,
	Director,
	Genre,
	GenreWithMovies,
	Movie,
	UpdateMovie,
	UpdateMovieTeam,
	UserList,
	WatchHistory,
	Writer,
} from '@/interfaces';

export const cineApiSlice = cineApi.injectEndpoints({
	endpoints: builder => ({
		getGenres: builder.query<Genre[], void>({
			query: () => '/movie/get-genres',
		}),
		getGenresWithMovies: builder.query<GenreWithMovies[], void>({
			query: () => '/movie/get-genres-movies',
			providesTags: ['genresMovies'],
		}),
		getMovies: builder.query<Movie[], string>({
			query: data => `/movie/get-movies?q=${data}`,
			providesTags: ['movie'],
		}),
		getMoviesByGenre: builder.query<Movie[], string>({
			query: id => `/movie/get-movies-by-genre/${id}`,
			providesTags: ['movie'],
		}),
		getMovie: builder.query<{ movie: DetailedMovie }, string>({
			query: id => `/movie/movie/${id}`,
		}),
		getUserList: builder.query<{ userList: UserList[] }, string>({
			query: user_id => `/movie/get-user-list/${user_id}`,
		}),
		addMovieToUserList :builder.mutation<{data:{addedMovieToUserList:{movie_id:string, updatedAt:string, user_id:string},msg:string}}, {user_id:string, movie_id:string}>({
			query: data => ({
				url:"/movie/add-movie-user-list",
				method:"POST",
				body:data
			})
		}),
		deleteMovieFromUserList: builder.mutation<{ data: { deletedMovieFromUserList:{movie_id:string, updatedAt:string, user_id:string},msg:string } }, {user_id:string, movie_id:string}>({
			query: data => {
				return {
					url: `/movie/delete-movie-user-list`,
					method: 'DELETE',
					body:data
				};
			},
		}),
		deleteUserList: builder.mutation<{ deletedUserListCount:number, msg:string }, string>({
			query: user_id => {
				return {
					url: `/movie/delete-user-list/${user_id}`,
					method: 'DELETE',
				};
			},
		}),
		getMoviesByUser: builder.query<{ userMovies: Movie[] }, string>({
			query: id => `/movie/get-movies-by-user/${id}`,
			providesTags: ['movie'],
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
		updateMovie: builder.mutation<{ msg: string; updateMovie: Movie },{ user_id_date: string; movie_id: string; data: UpdateMovie }>({
			query: data => {
				return {
					url: '/movie/update-movie',
					method: 'PUT',
					body: data,
				};
			},
			onQueryStarted: async ({ movie_id }, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(
						cineApiSlice.util.updateQueryData('getMovie', movie_id, draft => {
							Object.assign(draft.movie, data.updateMovie);
						})
					);
				} catch {}
			},
			invalidatesTags: ['movie', 'genresMovies'],
		}),
		updateGenres: builder.mutation<{ msg: string; updatedGenres: Genre[] },{ movie: DetailedMovie; genres: string[] }>({
			query: data => {
				const formData = {
					movie_id:data.movie.movie_id,
					genres:data.genres
				}
				return {
					url: '/movie/update-genretomovie',
					method: 'PUT',
					body: formData,
				};
			},
			onQueryStarted: async ({ movie }, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(
						cineApiSlice.util.upsertQueryData('getMovie', movie.movie_id, {
							movie: {
								...movie,
								genres: data.updatedGenres,
							},
						})
					);
				} catch {}
			},
			invalidatesTags: ['genresMovies'],
		}),
		updateDirectors: builder.mutation<{ msg: string; updatedDirectors: Director[] },{ movie: DetailedMovie; directors: UpdateMovieTeam[] }>({
			query: data => {
				const formData = {
					movie_id: data.movie.movie_id,
					directors: data.directors,
				};
				return {
					url: '/director/update-director',
					method: 'PUT',
					body: formData,
				};
			},
			onQueryStarted: async ({ movie }, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(
						cineApiSlice.util.upsertQueryData('getMovie', movie.movie_id, {
							movie: {
								...movie,
								directors: data.updatedDirectors,
							},
						})
					);
				} catch {}
			},
		}),
		updateWriters: builder.mutation<{ msg: string; updatedWriters: Writer[] },{ movie: DetailedMovie; writers: UpdateMovieTeam[] }>({
			query: data => {
				const formData = {
					movie_id: data.movie.movie_id,
					writers: data.writers,
				};
				return {
					url: '/writer/update-writer',
					method: 'PUT',
					body: formData,
				};
			},
			onQueryStarted: async ({ movie }, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(
						cineApiSlice.util.upsertQueryData('getMovie', movie.movie_id, {
							movie: {
								...movie,
								writers: data.updatedWriters,
							},
						})
					);
				} catch {}
			},
		}),
		updateCast: builder.mutation<{ msg: string; updatedCast: Cast[] },{ movie: DetailedMovie; cast: UpdateMovieTeam[] }>({
			query: data => {
				const formData = {
					movie_id: data.movie.movie_id,
					cast: data.cast,
				};
				return {
					url: '/cast/update-cast',
					method: 'PUT',
					body: formData,
				};
			},
			onQueryStarted: async ({ movie }, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(
						cineApiSlice.util.upsertQueryData('getMovie', movie.movie_id, {
							movie: {
								...movie,
								cast: data.updatedCast,
							},
						})
					);
				} catch {}
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
	useLazyGetWatchHistoryQuery,
	useGetMoviesByUserQuery,
	useUpdateMovieMutation,
	useUpdateDirectorsMutation,
	useUpdateWritersMutation,
	useUpdateCastMutation,
	useLazyGetUserListQuery,
	useAddMovieToUserListMutation,
	useDeleteMovieFromUserListMutation,
	useDeleteUserListMutation,
	useUpdateGenresMutation
} = cineApiSlice;
