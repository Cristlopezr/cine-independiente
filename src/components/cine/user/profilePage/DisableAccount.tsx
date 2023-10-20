import { AlertType } from '@/cine/pages/user';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Loading,
} from '@/components/ui';
import { useAuthStore } from '@/hooks';
import { useUpdateUserMutation } from '@/store/auth';
import { useState } from 'react';

export const DisableAccount = ({
	showHideAlert,
}: {
	showHideAlert: (alertType: AlertType, msg: string) => void;
}) => {
	const [updateUser, { isLoading }] = useUpdateUserMutation();
	const {
		user: { user_id },
		startLogout,
	} = useAuthStore();

	const [isAlertOpen, setIsAlertOpen] = useState(false);

	const onDisableAccount = async () => {
		try {
			await updateUser({ data: { active: false, user_id } }).unwrap();
			startLogout();
		} catch (error) {
			setIsAlertOpen(false);
			showHideAlert('error', 'Ha ocurrido un error al deshabilitar la cuenta');
		}
	};

	return (
		<div className='flex items-center justify-between gap-5 flex-wrap border border-destructive rounded-md p-10'>
			<div>
				<p className='text-base font-semibold'>Deshabilitar cuenta</p>
				<p className='text-[0.8rem] text-muted-foreground'>
					Al deshabilitar tu cuenta todas tus películas quedarán ocultas para los otros usuarios.
				</p>
			</div>
			<AlertDialog open={isAlertOpen}>
				<AlertDialogTrigger asChild onClick={() => setIsAlertOpen(true)}>
					<Button variant='destructive'>Deshabilitar cuenta</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
						<AlertDialogDescription>
							Al deshabilitar tu cuenta se cerrará tu sesión actual y todas tus películas
							quedarán ocultas para los otros usuarios.
						</AlertDialogDescription>
						<AlertDialogDescription>
							Para volver a habilitar tu cuenta, solo debes iniciar sesión con tus datos.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
							Volver atras
						</AlertDialogCancel>
						{isLoading ? (
							<Button
								className='flex items-center gap-3'
								variant='destructive'
								onClick={onDisableAccount}
							>
								<Loading className='w-6 h-6' />
								Procesando...
							</Button>
						) : (
							<Button variant='destructive' disabled={isLoading} onClick={onDisableAccount}>
								Deshabilitar cuenta
							</Button>
						)}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
