import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui';

export const Alert = ({
	onCancel,
	onAction,
	trigger,
	alertDialogDescription,
	alertDialogTitle,
	AlertDialogSubDescription,
	alertDialogCancel,
	alertDialogAction,
}: {
	onCancel?: () => void;
	onAction: () => void;
	trigger: React.ReactNode;
	alertDialogDescription: string;
	AlertDialogSubDescription?: string;
	alertDialogTitle: string;
	alertDialogCancel: string;
	alertDialogAction: string;
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger>{trigger}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{alertDialogTitle}</AlertDialogTitle>
					<AlertDialogDescription>{alertDialogDescription}</AlertDialogDescription>
					{AlertDialogSubDescription && (
						<AlertDialogDescription>{AlertDialogSubDescription}</AlertDialogDescription>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onCancel}>{alertDialogCancel}</AlertDialogCancel>
					<AlertDialogAction
						className='bg-destructive text-destructive-foreground hover:bg-destructive/80'
						onClick={onAction}
					>
						{alertDialogAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
