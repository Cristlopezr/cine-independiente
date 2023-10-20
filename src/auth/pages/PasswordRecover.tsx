import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input, Loading } from '@/components/ui';
import { AuthLayout } from '../layout';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { recoverPasswordEmailFormSchema } from '@/schemas/zSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectAuth } from '@/components/auth';
import { usePasswordRecoverMutation } from '@/store/auth';
import { useState } from 'react';
export const PasswordRecover = () => {
	const [recoverPassword, { isLoading, isSuccess, isError }] = usePasswordRecoverMutation();
	const [errorMessage, setErrorMessage] = useState('');

	const form = useForm<z.infer<typeof recoverPasswordEmailFormSchema>>({
		resolver: zodResolver(recoverPasswordEmailFormSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof recoverPasswordEmailFormSchema>) => {
		try {
			await recoverPassword(values).unwrap();
		} catch (error: any) {
			setErrorMessage(error?.data?.msg);
		}
	};

	return (
		<AuthLayout>
			<div className='flex flex-col gap-8 py-10'>
				<h1 className='text-2xl text-center'>Restablecer contraseña</h1>
				<p>
					Ingresa tu dirección de correo electrónico y te enviaremos un enlace para que puedas
					restablecer tu contraseña.
				</p>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Dirección de correo electrónico' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{isSuccess ? (
							<div className='text-center'>
								<p>Enlace enviado a {form.getValues('email')}</p>
								<p>Puedes cerrar esta ventana</p>
							</div>
						) : (
							<>
								{isLoading ? (
									<Button className='flex items-center gap-3 w-full'>
										<Loading className='w-6 h-6' />
										Procesando...
									</Button>
								) : (
									<Button className='w-full' disabled={isLoading}>
										Restablecer contraseña
									</Button>
								)}
							</>
						)}
					</form>
				</Form>
				{isError && <div className='text-destructive text-center font-semibold'>{errorMessage}</div>}
				<SelectAuth title='' linkText='Ir a iniciar sesión' href='/auth/login' />
			</div>
		</AuthLayout>
	);
};
