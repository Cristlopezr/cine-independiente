import { BsSearch } from 'react-icons/bs';
import { RiVideoAddLine } from 'react-icons/ri';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserNav, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';
import { useEffect, useState } from 'react';
import { SideBar } from '@/components';

export const Header = ({ headerTransparent }: { headerTransparent?: boolean }) => {
	const navigate = useNavigate();

	const onClickUpload = () => {
		navigate('/user/my-movies?upload=open');
	};

	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= 500) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={`grid grid-cols-[40px,1fr,1fr] min-[500px]:grid-cols-3 items-center transition-all duration-300 h-fit pt-1 md:h-[80px] px-5 sm:px-10 fixed z-50 right-0 left-0 ${
				headerTransparent
					? scrolled
						? 'bg-background/[98]'
						: 'bg-transparent'
					: 'bg-background/[98]'
			}`}
		>
			<div className='bg-gradient-to-b from-background/50 pointer-events-none -z-20 from-0% absolute top-0 -bottom-10 left-0 right-0'></div>
			<div className='flex items-center gap-5 w-fit md:w-full'>
				<SideBar />
				<nav className='hidden md:block'>
					<ul className='flex items-center gap-5 font-semibold'>
						<NavLink
							/* style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'white' })} */
							to='/'
						>
							Inicio
						</NavLink>
						<NavLink to="/cine/movies">Películas</NavLink>
					</ul>
				</nav>
			</div>

			<Link to='/' className='md:text-2xl font-semibold text-center w-fit min-[500px]:w-full'>
				Cine Stream
			</Link>

			<section className='flex items-center justify-end gap-4 min-[440px]:gap-6 p-2 font-semibold'>
				<TooltipProvider>
					<Tooltip delayDuration={100}>
						<TooltipTrigger>
							<Link to='/cine/search'>
								<BsSearch className='text-xl cursor-pointer' />
							</Link>
						</TooltipTrigger>
						<TooltipContent sideOffset={8}>
							<p>Buscar</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip delayDuration={100}>
						<TooltipTrigger>
							<RiVideoAddLine onClick={onClickUpload} className='text-2xl cursor-pointer' />
						</TooltipTrigger>
						<TooltipContent sideOffset={8}>
							<p>Subir película</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<UserNav />
			</section>
		</header>
	);
};
