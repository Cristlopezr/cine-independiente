import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from './ui';

interface CustomAlertProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
	variant?: 'default' | 'destructive';
}

export const CustomAlert = ({
	icon,
	title,
	description,
	className,
	variant = 'default',
}: CustomAlertProps) => {
	return (
		<Alert variant={variant} className={cn('flex items-center gap-5 z-50', className)}>
			<div>{icon}</div>
			<div>
				<AlertTitle className='text-lg'>{title}</AlertTitle>
				<AlertDescription>{description}</AlertDescription>
			</div>
		</Alert>
	);
};
