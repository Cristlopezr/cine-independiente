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
} from '@/components/ui';
import { editDirectorsFormSchema } from '@/schemas/zSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { DetailedMovie } from '../../../../interfaces/cineInterfaces';
import { AlertType } from '../../../../cine/pages/user/ProfilePage';
import { cn } from '@/lib/utils';
import { BsX } from 'react-icons/bs';
import { compareArrays } from '@/helpers';
import { useUpdateDirectorsMutation } from '@/store/cine';

export const EditDirectorsForm = ({
	movie,
	showHideAlert,
}: {
	movie: DetailedMovie;
	showHideAlert: (alertType: AlertType, msg: string) => void;
}) => {
	//!Usar update directors solo con cache update
	const [updateDirector, { isLoading }] = useUpdateDirectorsMutation();
	const form = useForm<z.infer<typeof editDirectorsFormSchema>>({
		resolver: zodResolver(editDirectorsFormSchema),
		defaultValues: {
			directors: movie.directors,
		},
	});

	const {
		fields: directorFields,
		append: appendDirector,
		remove: removeDirector,
	} = useFieldArray({
		name: 'directors',
		control: form.control,
	});

	const isSubmitButtonDisable = compareArrays(form.getValues('directors'), movie.directors);

	const [isFormDisabled, setIsFormDisabled] = useState(true);

	const onEdit = () => {
		setIsFormDisabled(false);
		form.reset({ directors: movie.directors });
	};

	const onCancel = () => {
		setIsFormDisabled(true);
		form.reset({ directors: movie.directors });
	};

	const onSubmit = async (values: z.infer<typeof editDirectorsFormSchema>) => {
		console.log(values);
		try {
			await updateDirector({movie_id:movie.movie_id, movie, directors: values.directors });
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
					{directorFields.map((field, index) => (
						<FormField
							disabled={isFormDisabled}
							control={form.control}
							key={field.id}
							name={`directors.${index}.name`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className={cn(index !== 0 && 'sr-only')}>Director</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input {...field} placeholder='Director' />
											{form.getValues('directors').length > 1 && !isFormDisabled && (
												<BsX
													className='cursor-pointer text-3xl absolute top-1/2 -translate-y-1/2 -right-8'
													onClick={() => removeDirector(index)}
												/>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<Button
						type='button'
						variant='outline'
						size='sm'
						className={`${isFormDisabled ? 'hidden' : 'block'} mt-2`}
						onClick={() => appendDirector({ name: '' })}
					>
						Agregar otro director
					</Button>
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
