import { CineLayout } from '@/cine/layout';
import { CustomAlert } from '@/components';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Loading,
	Separator,
} from '@/components/ui';
import { useAuthStore } from '@/hooks';
import { profileFormSchema } from '@/schemas/zSchemas';
import { useUpdateUserMutation } from '@/store/auth';
import { useUploadProfileImageMutation } from '@/store/cine';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiSolidError } from 'react-icons/bi';

type AlertType = 'success' | 'error';

export const ProfilePage = () => {
	const [uploadProfileImage] = useUploadProfileImageMutation();
	const [updateUser, { isLoading: isUpdateUserLoading }] = useUpdateUserMutation();
	const {
		user: { email, avatarUrl, lastname, name, user_id },
		startUpdatingUser,
	} = useAuthStore();

	const inputFileRef = useRef<HTMLInputElement | null>(null);

	const [isFormDisabled, setIsFormDisabled] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [showAlert, setShowAlert] = useState({ success: false, error: false });

	const form = useForm<z.infer<typeof profileFormSchema>>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name,
			lastname,
			email,
		},
	});

	const onEdit = () => {
		setIsFormDisabled(false);
		form.setValue('name', name);
		form.setValue('lastname', lastname);
		form.setValue('email', email);
	};

	const onCancel = () => {
		setIsFormDisabled(true);
		form.setValue('name', name);
		form.setValue('lastname', lastname);
		form.setValue('email', email);
	};

	const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e?.target?.files.length === 0) return;
		setErrorMessage('');
		try {
			profileFormSchema
				.partial()
				.pick({ profileImage: true })
				.parse({ profileImage: e?.target?.files });

			const { imageUrl } = await uploadProfileImage({
				userId: user_id,
				image: e?.target?.files[0],
			}).unwrap();

			/* const { updatedUser, msg } =  */

			await updateUser({
				data: { avatarUrl: imageUrl },
				user_id,
			}).unwrap();
			startUpdatingUser({ avatarUrl: imageUrl });
			if (inputFileRef.current) {
				inputFileRef.current.value = '';
			}
		} catch (error: any) {
			if (inputFileRef.current) {
				inputFileRef.current.value = '';
			}
			if (error instanceof z.ZodError) {
				const imageZodErrorMessage = error.errors[0]?.message;
				setErrorMessage(imageZodErrorMessage);
				return;
			}
			setErrorMessage(error?.data?.msg);
		}
	};

	const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
		if (isFormDisabled) return;
		const { email, ...dataToUpdate } = data;
		try {
			const { updatedUser } = await updateUser({ data: dataToUpdate, user_id }).unwrap();
			startUpdatingUser({ name: updatedUser.name, lastname: updatedUser.lastname });
			setIsFormDisabled(true);
			showHideAlert('success');
		} catch (error: any) {
			setIsFormDisabled(true);
			setErrorMessage(error?.data?.msg);
			showHideAlert('error');
		}
	};

	const showHideAlert = (alertType: AlertType) => {
		setShowAlert({ ...showAlert, [alertType]: true });
		setTimeout(() => {
			setShowAlert({ ...showAlert, [alertType]: false });
		}, 2000);
	};

	return (
		<CineLayout>
			<div className='mt-[100px] px-10 relative'>
				{showAlert.success && (
					<CustomAlert
						className='absolute top-0 left-1/2 -translate-x-1/2 w-1/2'
						icon={<AiOutlineCheck />}
						title='Éxito'
						description='Tu cuenta ha sido actualizada con éxito'
					/>
				)}
				{showAlert.error && (
					<CustomAlert
						className='absolute top-0 left-1/2 -translate-x-1/2 w-1/2'
						icon={<BiSolidError />}
						title='Error'
						description='Ha ocurrido un error al actualizar tu cuenta'
					/>
				)}
				<h1 className='text-xl font-medium'>Mi Perfil</h1>
				<Separator className='my-5' />
				<div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
					<div className='p-10 border rounded-md'>
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
											<FormLabel className='text-gray-500'>
												Correo electrónico
											</FormLabel>
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
											<Button
												type='button'
												onClick={onCancel}
												disabled={isUpdateUserLoading}
											>
												Cancelar
											</Button>
											{isUpdateUserLoading ? (
												<Button
													className='flex items-center gap-3'
													type='button'
													disabled
												>
													<Loading className='w-8 h-8' />
													Procesando...
												</Button>
											) : (
												<Button type='submit'>Guardar</Button>
											)}
										</div>
									)}
								</div>
							</form>
						</Form>
					</div>
					<div className='flex flex-col gap-5 items-center justify-center'>
						<Input
							type='file'
							ref={inputFileRef}
							onChange={onInputChange}
							accept='.jpeg, .png, .jpg'
							className='hidden'
						/>
						<Avatar
							onClick={() => inputFileRef?.current?.click()}
							className='w-[8rem] h-[8rem] cursor-pointer border-4 border-border-second'
						>
							<AvatarImage src={avatarUrl} />
							<AvatarFallback className='text-4xl'>
								<p>{name.slice(0, 1)}</p>
							</AvatarFallback>
						</Avatar>
						<Button
							variant='outline'
							onClick={() => inputFileRef?.current?.click()}
							className='font-semibold'
						>
							Cambiar imagen de perfil
						</Button>
						{errorMessage && <p className='text-destructive font-semibold'>{errorMessage}</p>}
					</div>
				</div>
			</div>
		</CineLayout>
	);
};
