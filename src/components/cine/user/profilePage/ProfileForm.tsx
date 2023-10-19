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
import { useAuthStore } from '@/hooks';
import { profileFormSchema } from '@/schemas/zSchemas';
import { useUpdateUserMutation } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const ProfileForm = ({
	showHideAlert,
}: {
	showHideAlert: (alertType: AlertType, msg: string) => void;
}) => {
	const [isFormDisabled, setIsFormDisabled] = useState(true);
	const {
		user: { email, lastname, name, user_id },
		startUpdatingUser,
	} = useAuthStore();
	const [updateUser, { isLoading: isUpdateUserLoading }] = useUpdateUserMutation();

	const form = useForm<z.infer<typeof profileFormSchema>>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name,
			lastname,
			email,
		},
	});

	const isSubmitButtonDisable = form.getValues('name') === name && form.getValues('lastname') === lastname;

	const onEdit = () => {
		setIsFormDisabled(false);
		form.reset({ name, lastname, email });
	};

	const onCancel = () => {
		setIsFormDisabled(true);
		form.reset({ name, lastname, email });
	};

	const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
		if (isFormDisabled) return;
		const { email, ...dataToUpdate } = data;
		try {
			const { updatedUser, msg } = await updateUser({ data: { ...dataToUpdate, user_id } }).unwrap();
			startUpdatingUser({ name: updatedUser.name, lastname: updatedUser.lastname });
			setIsFormDisabled(true);
			showHideAlert('success', msg);
		} catch (error: any) {
			onCancel();
			showHideAlert('error', error?.data?.msg || 'Ocurrió un error al actualizar el perfil');
		}
	};

	return (
		<div className='p-5 sm:p-10 border rounded-md'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						disabled={isFormDisabled}
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre</FormLabel>
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
						name='lastname'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Apellido</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						disabled
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-500'>Correo electrónico</FormLabel>
								<FormControl>
									<Input {...field} value={email} />
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
								<Button type='button' onClick={onCancel} disabled={isUpdateUserLoading}>
									Cancelar
								</Button>
								{isUpdateUserLoading ? (
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
