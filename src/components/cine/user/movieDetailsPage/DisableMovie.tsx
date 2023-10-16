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
import { DetailedMovie } from '@/interfaces';
import { useUpdateMovieMutation } from '@/store/cine';
import { useState } from 'react';

export const DisableMovie = ({
	showHideAlert,
	movie,
}: {
	movie: DetailedMovie;
	showHideAlert: (alertType: AlertType, msg: string) => void;
}) => {
	const [updateMovie, { isLoading }] = useUpdateMovieMutation();
	const [isAlertOpen, setIsAlertOpen] = useState(false);

	const onDisableMovie = async () => {
		try {
			await updateMovie({
				user_id_date: movie.user_id_date,
				movie_id: movie.movie_id,
				data: { enabled: !movie.enabled },
			}).unwrap();
			setIsAlertOpen(false);
			showHideAlert('success', 'Película actualizada correctamente');
		} catch (error) {
			setIsAlertOpen(false);
			showHideAlert('error', 'Ha ocurrido un error al actualizar la película');
		}
	};

	return (
		<div
			className={`flex items-center justify-between gap-5 flex-wrap border ${
				movie.enabled ? 'border-destructive' : 'border-green-600'
			}  rounded-md p-10`}
		>
			<div>
				<p className='text-base font-semibold'>
					{movie.enabled ? 'Deshabilitar película' : 'Habilitar película'}
				</p>
				<p className='text-[0.8rem] text-muted-foreground'>
					{movie.enabled
						? 'Al deshabilitar la película, esta quedará oculta para los otros usuarios.'
						: 'Al habilitar la película, esta quedará visible para los otros usuarios.'}
				</p>
			</div>
			<AlertDialog open={isAlertOpen}>
				<AlertDialogTrigger asChild onClick={() => setIsAlertOpen(true)}>
					<Button variant={movie.enabled ? 'destructive' : 'default'}>
						{movie.enabled ? 'Deshabilitar película' : 'Habilitar película'}
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
						<AlertDialogDescription>
							{movie.enabled
								? 'Al deshabilitar la película, esta quedará oculta para los otros usuarios.'
								: 'Al habilitar la película, esta quedará visible para los otros usuarios.'}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
							Volver atras
						</AlertDialogCancel>
						{isLoading ? (
							<Button
								className='flex items-center gap-3'
								variant={movie.enabled ? 'destructive' : 'default'}
								onClick={onDisableMovie}
							>
								<Loading className='w-6 h-6' />
								Procesando...
							</Button>
						) : (
							<Button
								variant={movie.enabled ? 'destructive' : 'default'}
								disabled={isLoading}
								onClick={onDisableMovie}
							>
								{movie.enabled ? 'Deshabilitar película' : 'Habilitar película'}
							</Button>
						)}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};
