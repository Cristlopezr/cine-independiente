import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Loading = ({ text, className }: { text?: string; className?: string }) => {
	return (
		<div className='flex flex-col items-center gap-5'>
			{text && <p>{text}</p>}
			<Loader2 className={cn('animate-spin w-8 h-8', className)} />
		</div>
	);
};
