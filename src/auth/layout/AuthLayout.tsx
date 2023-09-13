import { ModeToggle } from '@/components/mode-toggle';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='px-5 container min-h-screen'>
			<nav className=' p-5'>
				<ul className='flex items-center justify-between'>
					<li>Logo</li>
					<li>
						<ModeToggle />
					</li>
				</ul>
			</nav>
			<main className='max-w-[500px] mx-auto'>{children}</main>

			<footer></footer>
		</div>
	);
};
