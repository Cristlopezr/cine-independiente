import { cineApi } from '@/api';
import {
	Cast,
	CleanUploadMovieFormValues,
	DetailedMovie,
	Director,
	Genre,
	GenreWithMovies,
	InitialMovie,
	Movie,
	RecommendedMovie,
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
		getGenresWithMovies: builder.query<GenreWithMovies[], {take:string, skip:string}>({
			query: (data) => `/movie/get-genres-movies?take=${data.take}&skip=${data.skip}`,
			providesTags: ['genresMovies'],
		}),
		getRecommendedMovies: builder.query<{recommendedMovies:RecommendedMovie[]}, string>({
			query: user_id => `/user/get-recommended-movies-bygenre/${user_id}`,
		}),
		getMovies: builder.query<Movie[], {take:string, query:string, skip:string}>({
			query: data => `/movie/get-movies?q=${data.query}&take=${data.take}&skip=${data.skip}`,
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
		addMovieToUserList :builder.mutation<{data:{addedMovieToUserList:{movie_id:string, updatedAt:string, user_id:string},msg:string}}, {user_id:string, movie:Movie}>({
			query: data => ({
				url:"/movie/add-movie-user-list",
				method:"POST",
				body:{user_id:data.user_id, movie_id:data.movie.movie_id}
			}),
			async onQueryStarted({ user_id, movie }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					cineApiSlice.util.updateQueryData('getUserList', user_id, (draft) => {
					Object.assign(draft.userList, [...draft.userList, {user_id, movie_id:movie.movie_id, movie}])
				  })
				)
				try {
				  await queryFulfilled
				} catch {
				  patchResult.undo()
				}
			  },
		}),
		deleteMovieFromUserList: builder.mutation<{ data: { deletedMovieFromUserList:{movie_id:string, updatedAt:string, user_id:string},msg:string } }, {user_id:string, movie_id:string}>({
			query: data => {
				return {
					url: `/movie/delete-movie-user-list`,
					method: 'DELETE',
					body:data
				};
			},
			async onQueryStarted({ user_id, movie_id }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					cineApiSlice.util.updateQueryData('getUserList', user_id, (draft) => {
						draft.userList = draft.userList.filter((list) => list.movie_id !== movie_id);
				  })
				)
				try {
				  await queryFulfilled
				} catch {
				  patchResult.undo()
				}
			  },
		}),
		deleteUserList: builder.mutation<{ deletedUserListCount:number, msg:string }, string>({
			query: user_id => {
				return {
					url: `/movie/delete-user-list/${user_id}`,
					method: 'DELETE',
				};
			},
			onQueryStarted: async ( user_id , { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
					dispatch(
						cineApiSlice.util.updateQueryData('getUserList', user_id, draft => {
							draft.userList = []
						})
					);
				} catch {}
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
		saveWatchHistory: builder.mutation<string,{ user_id: string; movie_id: string; currentTime: number, movie:Movie }>({
			query: data => {
				return {
					url: '/movie/save-watch-history',
					method: 'POST',
					body: data,
				};
			},
			async onQueryStarted({ user_id, movie, currentTime }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					cineApiSlice.util.updateQueryData('getWatchHistory', user_id, (draft) => {
						if(draft.watchHistory.length>0){
							const watchHistory = draft.watchHistory.filter((singleWatchHistory) => singleWatchHistory.movie_id !== movie.movie_id);
							draft.watchHistory = [...watchHistory, {updatedAt:'0',user_id, movie_id:movie.movie_id, viewingTime:currentTime, movie}]
							return
						}
					Object.assign(draft.watchHistory, [...draft.watchHistory, {user_id, movie_id:movie.movie_id, viewingTime:currentTime, movie}])
				  })
				)
				try {
				  await queryFulfilled
				} catch {
				  patchResult.undo()
				}
			  },
		}),
		getWatchHistory: builder.query<{ watchHistory: WatchHistory[] }, string>({
			query: id => `/movie/get-watch-history/${id}`,
		}),
		deleteUserWatchHistory: builder.mutation<{ deletedWatchHistoryCount:number, msg:string }, string>({
			query: user_id => {
				return {
					url: `/movie/delete-user-watchhistory/${user_id}`,
					method: 'DELETE',
				};
			},
			onQueryStarted: async ( user_id , { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
					dispatch(
						cineApiSlice.util.updateQueryData('getWatchHistory', user_id, draft => {
							draft.watchHistory = []
						})
					);
				} catch {}
			},
		}),
		deleteMovieFromWatchHistory: builder.mutation<{ deletedWatchHistory:{ user_id: string,movie_id: string,viewingTime: number,updatedAt: string}, msg:string }, {user_id:string, movie_id:string}>({
			query: data => {
				return {
					url: `/movie/delete-movie-watchhistory`,
					method: 'DELETE',
					body:data
				};
			},
			async onQueryStarted({ user_id, movie_id }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					cineApiSlice.util.updateQueryData('getWatchHistory', user_id, (draft) => {
						draft.watchHistory = draft.watchHistory.filter((singleWatchHistory) => singleWatchHistory.movie_id !== movie_id);
				  })
				)
				try {
				  await queryFulfilled
				} catch {
				  patchResult.undo()
				}
			  },
		}),
		uploadMovieInfo: builder.mutation<{ createdMovie: Movie }, InitialMovie>({
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
	useGetMoviesByUserQuery,
	useUpdateMovieMutation,
	useUpdateDirectorsMutation,
	useUpdateWritersMutation,
	useUpdateCastMutation,
	useGetUserListQuery,
	useAddMovieToUserListMutation,
	useDeleteMovieFromUserListMutation,
	useDeleteUserListMutation,
	useUpdateGenresMutation,
	useDeleteUserWatchHistoryMutation,
	useDeleteMovieFromWatchHistoryMutation,
	useGetRecommendedMoviesQuery
} = cineApiSlice;
