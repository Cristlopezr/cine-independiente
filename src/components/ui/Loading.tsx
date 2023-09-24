import { Loader2 } from 'lucide-react';

export const Loading = ({ text }: { text?: string }) => {
	return (
		<div className='flex flex-col items-center gap-5'>
			{text && <p>{text}</p>}
			<Loader2 className='animate-spin w-8 h-8' />
		</div>
	);
};
