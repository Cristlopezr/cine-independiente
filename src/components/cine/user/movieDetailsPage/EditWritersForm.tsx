import { AlertType } from '@/cine/pages/user';
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
import { compareArrays } from '@/helpers';
import { DetailedMovie } from '@/interfaces';
import { cn } from '@/lib/utils';
import { editWritersFormSchema } from '@/schemas/zSchemas';
import { useUpdateWritersMutation } from '@/store/cine';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { BsX } from 'react-icons/bs';
import * as z from 'zod';

export const EditWritersForm = ({
	movie,
	showHideAlert,
}: {
	movie: DetailedMovie;
	showHideAlert: (alertType: AlertType, msg: string) => void;
}) => {
	const [updateWriter, { isLoading }] = useUpdateWritersMutation();
	const form = useForm<z.infer<typeof editWritersFormSchema>>({
		resolver: zodResolver(editWritersFormSchema),
		defaultValues: {
			writers: movie.writers,
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: 'writers',
		control: form.control,
	});

	const isSubmitButtonDisable = compareArrays(form.getValues('writers'), movie.writers);

	const [isFormDisabled, setIsFormDisabled] = useState(true);

	const onEdit = () => {
		setIsFormDisabled(false);
		form.reset({ writers: movie.writers });
	};

	const onCancel = () => {
		setIsFormDisabled(true);
		form.reset({ writers: movie.writers });
	};

	const onSubmit = async (values: z.infer<typeof editWritersFormSchema>) => {
		try {
			await updateWriter({ movie, writers: values.writers }).unwrap();
			setIsFormDisabled(true);
			showHideAlert('success', 'Película actualizada correctamente');
		} catch (error: any) {
			console.log(error);
			onCancel();
			showHideAlert('error', error?.data?.msg || 'Ocurrió un error al actualizar la película');
		}
	};

	return (
		<div className='p-10 border rounded-md'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					{fields.map((field, index) => (
						<FormField
							disabled={isFormDisabled}
							control={form.control}
							key={field.id}
							name={`writers.${index}.name`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className={cn(index !== 0 && 'sr-only')}>Guionistas</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input {...field} placeholder='Guionista' />
											{form.getValues('writers').length > 1 && !isFormDisabled && (
												<BsX
													className='cursor-pointer text-3xl absolute top-1/2 -translate-y-1/2 -right-8'
													onClick={() => remove(index)}
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
						onClick={() => append({ name: '' })}
					>
						Agregar otro guionista
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
