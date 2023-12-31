import { Separator } from '@/components/ui';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='container min-h-screen'>
			<nav className='p-5'>
				<ul className='flex items-center justify-between h-10'>
					<img src='/assets/LogoStream2.png' className='h-full' alt='' />
				</ul>
			</nav>
			<Separator />
			<main className='max-w-[450px] mx-auto mt-16'>{children}</main>
			<footer></footer>
		</div>
	);
};
