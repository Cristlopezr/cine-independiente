import { Button } from '@/components/ui';
import { useAuthStore } from '@/hooks';

export const CinePage = () => {
	const { user, startLogout } = useAuthStore();

	return (
		<div>
			Hola {user.name} {user.lastname}
			<Button onClick={startLogout}>Cerrar sesión</Button>
		</div>
	);
};
