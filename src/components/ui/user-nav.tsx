import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui';
import { useAuthStore } from '@/hooks';
import { useNavigate } from 'react-router-dom';

const userNavItems = [
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
];

export function UserNav() {
	const { user, startLogout } = useAuthStore();
	const navigate = useNavigate();

	const onGoToPage = (path: string) => {
		navigate(path);
	};

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild className='overflow-auto'>
				<span className='flex items-center justify-between gap-2 cursor-pointer'>
					<Avatar className='cursor-pointer border-2 border-border-second'>
						<AvatarImage src={user.avatarUrl ? user.avatarUrl : undefined} />
						<AvatarFallback className='font-semibold'>{user.name.slice(0, 1)}</AvatarFallback>
					</Avatar>
					<p className='hidden md:block'>{user.name}</p>
				</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-fit mt-3 mr-1 lg:mr-0' align='center' forceMount>
				<DropdownMenuGroup>
					{userNavItems.map(item => (
						<DropdownMenuItem key={item.path} onClick={() => onGoToPage(item.path)}>
							{item.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={startLogout}>Cerrar sesión</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
