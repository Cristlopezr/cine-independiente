import { CustomAlert } from '@/components';
import { MovieCarouselItem } from '@/components/cine/carousel';
import { Button, Loading, Separator } from '@/components/ui';
import { useAuthStore, useShowHideAlert } from '@/hooks';
import { useDeleteUserListMutation, useGetUserListQuery } from '@/store/cine';
import React from 'react';
import { BiSolidError } from 'react-icons/bi';

export const MyListPage = () => {
	const { user } = useAuthStore();
	const { data: userList, isFetching, isError } = useGetUserListQuery(user.user_id);
	const [deleteUserList, { isLoading }] = useDeleteUserListMutation();
	const { showAlert, showHideAlert } = useShowHideAlert();

	if (isFetching) {
		return (
			<div className='mt-[100px] px-10'>
				<h1 className='px-5 text-2xl font-semibold'>Mi lista</h1>
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
				<h1 className='px-5 text-2xl font-semibold'>Mi lista</h1>
				<Separator className='my-5' />
				<div className='mt-10 text-xl text-center'>Ha ocurrido un error al obtener la lista.</div>
			</div>
		);
	}

	if (userList && userList?.userList?.length < 1) {
		return (
			<div className='mt-[100px] px-10'>
				<h1 className='px-5 text-2xl font-semibold'>Mi lista</h1>
				<Separator className='my-5' />
				<div className='mt-10 text-xl text-center'>Aún no has añadido películas a tu lista.</div>
			</div>
		);
	}

	const onDeleteList = async () => {
		try {
			await deleteUserList(user.user_id).unwrap();
		} catch (error) {
			showHideAlert('error', 'Ha ocurrido un error al eliminar la lista.');
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
				<h1 className='text-2xl font-semibold'>Mi lista</h1>
				{isLoading ? (
					<Button className='flex items-center gap-3'>
						<Loading className='w-6 h-6' />
						Procesando...
					</Button>
				) : (
					<Button onClick={onDeleteList}>Borrar todo</Button>
				)}
			</div>
			<Separator className='my-5' />
			<div className='mt-10 grid grid-cols-2 gap-y-5 gap-x-3 min-[677px]:grid-cols-3 min-[1177px]:grid-cols-4 min-[1500px]:grid-cols-5'>
				{userList?.userList?.map(({ movie }) => (
					<React.Fragment key={movie.movie_id}>
						<MovieCarouselItem movie={movie} className='aspect-[16/9]' />
					</React.Fragment>
				))}
			</div>
		</div>
	);
};
