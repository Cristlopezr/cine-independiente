import { BsSearch, BsList } from 'react-icons/bs';
import { RiVideoAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { UserNav, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';
import { useEffect, useState } from 'react';

export const Header = () => {
	const navigate = useNavigate();

	const onClickUpload = () => {
		navigate('/my-movies?upload=open');
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
			className={`grid grid-cols-3 transition-all duration-300 items-center justify-center h-[80px] px-10 fixed z-10 right-0 left-0 ${
				scrolled ? 'bg-background/[98]' : 'bg-transparent'
			}`}
			
		>

			<div className='bg-gradient-to-b from-background/50 -z-20 from-0% absolute top-0 -bottom-10 left-0 right-0'></div>
			<div className='flex items-center gap-5'>
				<BsList className='w-10 p-2 h-12' />
				<nav className='hidden md:block'>
					<ul className='flex items-center gap-5 font-semibold'>
						<li>Películas</li>
						<li>Géneros</li>
					</ul>
				</nav>
			</div>
			<div className='flex flex-col justify-center items-center'>
				<div className='text-2xl font-semibold'>Cine Stream</div>
			</div>
			<section className='flex items-center justify-end gap-4 min-[440px]:gap-6 p-2 font-semibold'>
				<BsSearch className='text-xl cursor-pointer' />
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
