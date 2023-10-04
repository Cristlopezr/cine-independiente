import { Separator } from '@/components/ui';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='container min-h-screen'>
			<nav className='p-5'>
				<ul className='flex items-center justify-between h-10'>
					<li>Logo</li>
				</ul>
			</nav>
			<Separator />
			<main className='max-w-[600px] mx-auto mt-16'>{children}</main>
			<footer></footer>
		</div>
	);
};
