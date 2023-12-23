import { Header } from '@/components/cine/layout';
import { Outlet } from 'react-router-dom';

export const CineLayout = ({ headerTransparent }: { headerTransparent?: boolean }) => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Header headerTransparent={headerTransparent} />
			<main className='h-full'>
				<Outlet />
			</main>
			<footer className='h-[80px]'></footer>
		</div>
	);
};
