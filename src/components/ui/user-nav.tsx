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

export function UserNav() {
	const { user, startLogout } = useAuthStore();
	const navigate = useNavigate();

	const onGoToProfile = () => {
		navigate('/profile');
	};

	const onGoToMyMovies = () => {
		navigate('/my-movies');
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
					<DropdownMenuItem onClick={onGoToProfile}>Mi perfil</DropdownMenuItem>
					<DropdownMenuItem onClick={onGoToMyMovies}>Mis películas</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={startLogout}>Cerrar sesión</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
