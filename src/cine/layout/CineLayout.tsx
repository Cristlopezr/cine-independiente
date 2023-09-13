import { Header } from '@/components/cine/layout';
import { ModeToggle } from '@/components/mode-toggle';

export const CineLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='min-h-screen px-5 lg:px-12 grid grid-rows-[80px,1fr,200px] gap-5'>
			<Header/>
			<main className=''>{children}</main>

			<footer>
				<ul>
					<li>
						<ModeToggle />
					</li>
				</ul>
			</footer>
		</div>
	);
};
