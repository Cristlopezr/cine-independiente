import { Button } from '@/components/ui';
import { useAuthStore } from '@/hooks';

export const CinePage = () => {
	const { user, startLogout } = useAuthStore();

	return (
		<div className='min-h-screen p-5'>
			<div className='flex justify-between items-center'>
				Hola {user.name} {user.lastname}
				<Button onClick={startLogout}>Cerrar sesión</Button>
			</div>
		</div>
	);
};
