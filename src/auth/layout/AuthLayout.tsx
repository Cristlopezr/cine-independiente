import { ModeToggle } from '@/components/mode-toggle';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='p-5'>
			<nav>
				<ul className='flex items-center justify-between'>
					<li>Logo</li>
					<li>
						<ModeToggle />
					</li>
				</ul>
			</nav>

			<main>{children}</main>

			<footer></footer>
		</div>
	);
};