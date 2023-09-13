import { BsSearch, BsList } from 'react-icons/bs';
import { RiVideoAddLine } from 'react-icons/ri';
import { Dropdown } from '..';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
	const navigate = useNavigate();

	const onClickUpload = () => {
		navigate('/my-movies?upload=true');
	};

	return (
		<header className='grid grid-cols-3 items-center justify-center'>
			<div className='flex items-center gap-5'>
				<BsList className='w-10 p-2 h-12' />
				<nav className='hidden md:block'>
					<ul className='flex items-center gap-5'>
						<li>Películas</li>
						<li>Catégorias</li>
					</ul>
				</nav>
			</div>
			<div className='flex flex-col justify-center items-center'>
				<div>Cine Stream</div>
			</div>
			<section className='flex items-center justify-end gap-3 sm:gap-6 pl-2'>
				<BsSearch className='text-xl cursor-pointer' />
				<RiVideoAddLine onClick={onClickUpload} className='text-2xl cursor-pointer' />
				<Dropdown />
			</section>
		</header>
	);
};
