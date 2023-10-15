import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Loading,
	Textarea,
} from '@/components/ui';
import { editMovieFormSchema } from '@/schemas/zSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { DetailedMovie } from '../../../../interfaces/cineInterfaces';
import { useUpdateMovieMutation } from '@/store/cine';
import { AlertType } from '../../../../cine/pages/user/ProfilePage';

export const EditMovieForm = ({
	movie,
	showHideAlert,
}: {
	movie: DetailedMovie;
	showHideAlert: (alertType: AlertType, msg: string) => void;
}) => {
	const [onUpdateMovie, { isLoading }] = useUpdateMovieMutation();
	const form = useForm<z.infer<typeof editMovieFormSchema>>({
		resolver: zodResolver(editMovieFormSchema),
		defaultValues: {
			title: movie.title,
			productionYear: movie.productionYear.toString(),
			synopsis: movie.synopsis,
		},
	});

	const isSubmitButtonDisable =
		form.getValues('title') === movie.title &&
		form.getValues('productionYear') === movie.productionYear.toString() &&
		form.getValues('synopsis') === movie.synopsis;

	const [isFormDisabled, setIsFormDisabled] = useState(true);

	const onEdit = () => {
		setIsFormDisabled(false);
		form.reset({
			title: movie.title,
			productionYear: movie.productionYear.toString(),
			synopsis: movie.synopsis,
		});
	};

	const onCancel = () => {
		setIsFormDisabled(true);
		form.reset({
			title: movie.title,
			productionYear: movie.productionYear.toString(),
			synopsis: movie.synopsis,
		});
	};

	const onSubmit = async (values: z.infer<typeof editMovieFormSchema>) => {
		try {
			await onUpdateMovie({
				user_id_date: movie.user_id_date,
				movie_id: movie.movie_id,
				data: {
					...values,
					productionYear: Number(values.productionYear),
				},
			}).unwrap();
			setIsFormDisabled(true);
			showHideAlert('success', 'Película actualizada correctamente');
		} catch (error: any) {
			onCancel();
			showHideAlert('error', error?.data?.msg || 'Ocurrió un error al actualizar la película');
		}
	};

	return (
		<div className='p-10 border rounded-md'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						disabled={isFormDisabled}
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Título</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						disabled={isFormDisabled}
						control={form.control}
						name='synopsis'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sinopsis</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						disabled={isFormDisabled}
						control={form.control}
						name='productionYear'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Año de producción</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='pt-5'>
						{isFormDisabled && (
							<Button type='button' onClick={onEdit}>
								Editar
							</Button>
						)}
						{!isFormDisabled && (
							<div className='flex gap-12 items-center'>
								<Button type='button' onClick={onCancel} disabled={isLoading}>
									Cancelar
								</Button>
								{isLoading ? (
									<Button className='flex items-center gap-3' type='button' disabled>
										<Loading className='w-6 h-6' />
										Procesando...
									</Button>
								) : (
									<Button disabled={isSubmitButtonDisable} type='submit'>
										Guardar
									</Button>
								)}
							</div>
						)}
					</div>
				</form>
			</Form>
		</div>
	);
};
