import { configureStore } from '@reduxjs/toolkit';
import { authSlice, authApiSlice } from '@/store/auth';
import { videoApiSlice, cineSlice } from '@/store/cine';
// ...

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		cine: cineSlice.reducer,
		[authApiSlice.reducerPath]: authApiSlice.reducer,
		[videoApiSlice.reducerPath]: videoApiSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(authApiSlice.middleware, videoApiSlice.middleware),
	devTools: import.meta.env.MODE !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
