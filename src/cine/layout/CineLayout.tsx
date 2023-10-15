import { Header } from '@/components/cine/layout';

export const CineLayout = ({
	children,
	headerTransparent,
}: {
	headerTransparent?: boolean;
	children: React.ReactNode;
}) => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Header headerTransparent={headerTransparent} />
			<main className='h-full'>{children}</main>

			<footer className='h-[180px] mt-auto'></footer>
		</div>
	);
};
