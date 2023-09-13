import { useAuthStore } from '@/hooks';
import { CineLayout } from '../layout';

export const CinePage = () => {
	const { user } = useAuthStore();

	return (
		<CineLayout>
			<div className='flex justify-between items-center'>
				Hola {user.name} {user.lastname}
			</div>
		</CineLayout>
	);
};
