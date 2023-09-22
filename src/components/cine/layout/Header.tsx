import { BsSearch, BsList } from 'react-icons/bs';
import { RiVideoAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { UserNav, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';

export const Header = () => {
	const navigate = useNavigate();

	const onClickUpload = () => {
		navigate('/my-movies?upload=open');
	};

	return (
		<header className='grid grid-cols-3 items-center justify-center'>
			<div className='flex items-center gap-5'>
				<BsList className='w-10 p-2 h-12' />
				<nav className='hidden md:block'>
					<ul className='flex items-center gap-5'>
						<li>Películas</li>
						<li>Géneros</li>
					</ul>
				</nav>
			</div>
			<div className='flex flex-col justify-center items-center'>
				<div>Cine Stream</div>
			</div>
			<section className='flex items-center justify-end gap-4 min-[440px]:gap-6 pl-2'>
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
