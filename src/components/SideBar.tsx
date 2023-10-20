import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/';
import { BsList } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const sideBarItems = [
	{
		name: 'Inicio',
		path: '/',
	},
	{
		name: 'Mi perfil',
		path: '/profile',
	},
	{
		name: 'Mis películas',
		path: '/my-movies',
	},
	{
		name: 'Mi lista',
		path: '/my-list',
	},
	{
		name: 'Mi historial',
		path: '/my-history',
	},
];

export const SideBar = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<BsList className='w-10 p-2 h-12 cursor-pointer text-white/80 hover:text-white' />
			</SheetTrigger>
			<SheetContent side='left' className='p-16 flex flex-col gap-10 text-2xl'>
				{sideBarItems.map(item => (
					<Link
						to={item.path}
						key={item.path}
						className='cursor-pointer text-white/80 hover:text-white hover:font-semibold'
					>
						{item.name}
					</Link>
				))}
			</SheetContent>
		</Sheet>
	);
};
