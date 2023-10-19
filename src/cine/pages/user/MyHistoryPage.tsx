import { CineLayout } from '@/cine/layout';
import { CustomAlert } from '@/components';
import { MovieCarouselItem } from '@/components/cine/carousel';
import { Button, Loading, Separator } from '@/components/ui';
import { useAuthStore, useCineStore, useShowHideAlert } from '@/hooks';
import { useDeleteUserWatchHistoryMutation } from '@/store/cine';
import React from 'react';
import { BiSolidError } from 'react-icons/bi';

export const MyHistoryPage = () => {
	const { watchHistory, isGetWatchHistoryLoading, onDeleteUserWatchHistory } = useCineStore();
	const { user } = useAuthStore();
	const [deleteWatchHistory, { isLoading }] = useDeleteUserWatchHistoryMutation();
	const { showAlert, showHideAlert } = useShowHideAlert();

	if (isGetWatchHistoryLoading) {
		return (
			<CineLayout>
				<div className='mt-[100px] px-10'>
					<h1 className='px-5 text-2xl font-semibold'>Mi historial</h1>
					<Separator className='my-5' />
					<div className='mt-20'>
						<Loading />
					</div>
				</div>
			</CineLayout>
		);
	}

	if (watchHistory.length < 1) {
		return (
			<CineLayout>
				<div className='mt-[100px] px-10'>
					<h1 className='px-5 text-2xl font-semibold'>Mi historial</h1>
					<Separator className='my-5' />
					<div className='mt-10 text-xl text-center'>Aún no has visto películas.</div>
				</div>
			</CineLayout>
		);
	}

	const onDeleteWatchHistory = async () => {
		try {
			await deleteWatchHistory(user.user_id).unwrap();
			onDeleteUserWatchHistory();
		} catch (error) {
			showHideAlert('error', 'Ha ocurrido un error al eliminar el historial de visualización.');
		}
	};

	return (
		<CineLayout>
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
					{watchHistory?.map(({ movie }) => (
						<React.Fragment key={movie.movie_id}>
							<MovieCarouselItem movie={movie} className='aspect-[16/9]' isHistoryPage />
						</React.Fragment>
					))}
				</div>
			</div>
		</CineLayout>
	);
};
