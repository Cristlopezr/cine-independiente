import { AlertType } from '@/cine/pages/user';
import {
	Button,
	Checkbox,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Loading,
} from '@/components/ui';
import { compareArrays } from '@/helpers';
import { DetailedMovie } from '@/interfaces';
import { editGenresFormSchema } from '@/schemas/zSchemas';
import { useGetGenresQuery, useUpdateGenresMutation } from '@/store/cine';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const EditMoviesGenres = ({
	movie,
	showHideAlert,
}: {
	movie: DetailedMovie;
	showHideAlert: (alertType: AlertType, msg: string) => void;
}) => {
	const { data: genres, isLoading: isGetGenresLoading, isError } = useGetGenresQuery();

	const [updateGenres, { isLoading }] = useUpdateGenresMutation();

	const [isFormDisabled, setIsFormDisabled] = useState(true);

	const form = useForm<z.infer<typeof editGenresFormSchema>>({
		resolver: zodResolver(editGenresFormSchema),
		defaultValues: { genres: movie.genres.map(genre => genre.genre_id) },
	});

	const isSubmitButtonDisable = compareArrays(
		form.getValues('genres'),
		movie.genres.map(genre => genre.genre_id)
	);

	const onEdit = () => {
		setIsFormDisabled(false);
		form.reset({
			genres: movie.genres.map(genre => genre.genre_id),
		});
	};

	const onCancel = () => {
		setIsFormDisabled(true);
		form.reset({
			genres: movie.genres.map(genre => genre.genre_id),
		});
	};

	const onSubmit = async (values: z.infer<typeof editGenresFormSchema>) => {
		try {
			await updateGenres({ movie, genres: values.genres }).unwrap();
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
						control={form.control}
						name='genres'
						render={() => (
							<FormItem>
								<div className='mb-4'>
									<FormLabel className='text-base'>Género</FormLabel>
									<FormDescription>Selecciona al menos un género</FormDescription>
								</div>
								{isError ? (
									<p className='text-center text-destructive font-semibold pt-5'>
										Error al obtener los géneros
									</p>
								) : (
									<>
										{isGetGenresLoading ? (
											<div className='pt-5'>
												<Loading text='Obteniendo géneros...' />
											</div>
										) : (
											<div className='grid gap-y-2 gap-x-4 grid-cols-[repeat(auto-fill,minmax(140px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]'>
												{genres!.map(genre => (
													<FormField
														key={genre.genre_id}
														control={form.control}
														name='genres'
														render={({ field }) => {
															return (
																<FormItem
																	key={genre.genre_id}
																	className='flex flex-row items-start space-x-3 space-y-0'
																>
																	<FormControl>
																		<Checkbox
																			disabled={isFormDisabled}
																			checked={field.value.includes(
																				genre.genre_id
																			)}
																			onCheckedChange={checked => {
																				return checked
																					? field.onChange([
																							...field.value,
																							genre.genre_id,
																					  ])
																					: field.onChange(
																							field.value?.filter(
																								value =>
																									value !==
																									genre.genre_id
																							)
																					  );
																			}}
																		/>
																	</FormControl>
																	<FormLabel className='font-normal'>
																		{genre.name}
																	</FormLabel>
																</FormItem>
															);
														}}
													/>
												))}
											</div>
										)}
									</>
								)}

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
