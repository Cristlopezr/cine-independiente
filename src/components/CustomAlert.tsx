import { Alert, AlertDescription, AlertTitle } from './ui';

interface CustomAlertProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}

export const CustomAlert = ({ icon, title, description, className }: CustomAlertProps) => {
	return (
		<Alert className={className}>
			{icon}
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{description}</AlertDescription>
		</Alert>
	);
};
