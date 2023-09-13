import { Loader2 } from 'lucide-react';

export const Loading = () => {
	return (
		<div className='flex justify-center'>
			<div className='flex flex-col items-center gap-5 mt-40'>
				<p>Cargando...</p>
				<Loader2 className='animate-spin' />
			</div>
		</div>
	);
};
