import { CustomAlert } from '@/components';
import { MovieCarouselItem } from '@/components/cine/carousel';
import { Button, Loading, Separator } from '@/components/ui';
import { useAuthStore, useShowHideAlert } from '@/hooks';
import { useDeleteUserWatchHistoryMutation, useGetWatchHistoryQuery } from '@/store/cine';
import React from 'react';
import { BiSolidError } from 'react-icons/bi';

export const MyHistoryPage = () => {
	const { user } = useAuthStore();
	const [deleteWatchHistory, { isLoading }] = useDeleteUserWatchHistoryMutation();
	const {
		data: watchHistory,
		isFetching: isGetWatchHistoryLoading,
		isError,
	} = useGetWatchHistoryQuery(user.user_id);
	const { showAlert, showHideAlert } = useShowHideAlert();

	if (isGetWatchHistoryLoading) {
		return (
			<div className='mt-[100px] px-10'>
				<h1 className='px-5 text-2xl font-semibold'>Mi historial</h1>
				<Separator className='my-5' />
				<div className='mt-20'>
					<Loading />
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className='mt-[100px] px-10'>
				<h1 className='px-5 text-2xl font-semibold'>Mi historial</h1>
				<Separator className='my-5' />
				<div className='mt-20'>
					<div className='mt-10 text-xl text-center'>
						Ha ocurrido un error al obtener el historial de visualización.
					</div>
				</div>
			</div>
		);
	}

	if (watchHistory?.watchHistory && watchHistory?.watchHistory?.length < 1) {
		return (
			<div className='mt-[100px] px-10'>
				<h1 className='px-5 text-2xl font-semibold'>Mi historial</h1>
				<Separator className='my-5' />
				<div className='mt-10 text-xl text-center'>Aún no has visto películas.</div>
			</div>
		);
	}

	const onDeleteWatchHistory = async () => {
		try {
			await deleteWatchHistory(user.user_id).unwrap();
		} catch (error) {
			showHideAlert('error', 'Ha ocurrido un error al eliminar el historial de visualización.');
		}
	};

	return (
		<div className='mt-[100px] px-5 sm:px-10'>
			<CustomAlert
				className={`${
					showAlert.error ? 'top-32' : '-top-24'
				} bg-background border-destructive transition-all duration-500 ease-in-out absolute left-1/2 -translate-x-1/2 w-1/2`}
				icon={<BiSolidError className='w-6 h-6 text-destructive' />}
				title='Error'
				description={showAlert.msg}
			/>
			<div className='flex items-center justify-between sm:px-5'>
				<h1 className='text-2xl font-semibold'>Mi historial</h1>
				{isLoading ? (
					<Button className='flex items-center gap-3'>
						<Loading className='w-6 h-6' />
						Procesando...
					</Button>
				) : (
					<Button onClick={onDeleteWatchHistory}>Borrar todo</Button>
				)}
			</div>
			<Separator className='my-5' />
			<div className='mt-10 grid grid-cols-2 gap-y-5 gap-x-3 min-[677px]:grid-cols-3 min-[1177px]:grid-cols-4 min-[1500px]:grid-cols-5'>
				{watchHistory?.watchHistory?.map(({ movie }) => (
					<React.Fragment key={movie.movie_id}>
						<MovieCarouselItem movie={movie} className='aspect-[16/9]' isHistoryPage />
					</React.Fragment>
				))}
			</div>
		</div>
	);
};
