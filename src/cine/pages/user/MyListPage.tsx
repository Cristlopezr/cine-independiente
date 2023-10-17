import { CineLayout } from '@/cine/layout';
import { MovieCarouselItem } from '@/components/cine/carousel';
import { Loading, Separator } from '@/components/ui';
import { useCineStore } from '@/hooks';
import React from 'react';

export const MyListPage = () => {
	const { userList, isGetUserListLoading } = useCineStore();

	if (isGetUserListLoading) {
		return (
			<CineLayout>
				<div className='mt-[100px] px-10'>
					<h1 className='px-5 text-2xl font-semibold'>Mi lista</h1>
					<Separator className='my-5' />
					<div className='mt-20'>
						<Loading />
					</div>
				</div>
			</CineLayout>
		);
	}

	if (userList.length === 0) {
		return (
			<CineLayout>
				<div className='mt-[100px] px-10'>
					<h1 className='px-5 text-2xl font-semibold'>Mi lista</h1>
					<Separator className='my-5' />
					<div className='mt-10 text-xl text-center'>Aún no has añadido películas a tu lista.</div>
				</div>
			</CineLayout>
		);
	}

	return (
		<CineLayout>
			<div className='mt-[100px] px-10'>
				<h1 className='px-5 text-2xl font-semibold'>Mi lista</h1>
				<Separator className='my-5' />
				<div className='mt-10 grid grid-cols-2 gap-y-5 gap-x-3 min-[677px]:grid-cols-3 min-[1177px]:grid-cols-4 min-[1500px]:grid-cols-5'>
					{userList?.map(({ movie }, i) => (
						<React.Fragment key={i}>
							<MovieCarouselItem movie={movie} className='aspect-[16/9]' />
						</React.Fragment>
					))}
				</div>
			</div>
		</CineLayout>
	);
};
