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

const items = [
	{
		name: 'Item 1',
		onClick: () => console.log('Clicked item 1'),
	},
	{
		name: 'Item 2',
		onClick: () => console.log('Clicked item 2'),
	},
	{
		name: 'Item 3',
		onClick: () => console.log('Clicked item 3'),
	},
];

export function UserNav() {
	const { user, startLogout } = useAuthStore();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<span className='flex items-center justify-between gap-2 cursor-pointer'>
					<Avatar className='h-7 w-7 md:h-8 md:w-8 cursor-pointer'>
						<AvatarImage src={user.avatarUrl ? user.avatarUrl : undefined} />
						<AvatarFallback className='uppercase font-semibold text-lg'>
							{user.name.slice(0, 1)}
						</AvatarFallback>
					</Avatar>
					<p className='hidden md:block'>{user.name}</p>
				</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-fit mt-3 mr-1 lg:mr-0' align='center' forceMount>
				<DropdownMenuGroup>
					{items.map(item => (
						<DropdownMenuItem onClick={item.onClick} key={item.name}>
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
