import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { loginFormSchema } from '@/schemas/zSchemas';
import { SelectAuth } from '..';

export const LoginForm = ({ title }: { title: string }) => {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
		//!llegar al backend y guardar usuario en estado si es que existe
		console.log(values);
	};

	return (
		<div>
			<h1 className='text-center mt-10 mb-5 text-2xl'>{title}</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 p-5'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className='focus-visible:ring-0 border-x-0 border-t-0 rounded-none shadow-none'
										placeholder='Dirección de correo electrónico'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className='relative'>
										<Input
											className='focus-visible:ring-0 border-x-0 border-t-0 rounded-none shadow-none'
											placeholder='Contraseña'
											{...field}
											type={`${!showPassword ? 'password' : 'text'}`}
											autoComplete='new-password'
											spellCheck={false}
										/>
										<span
											onClick={() => setShowPassword(!showPassword)}
											className='w-5 sm:w-8 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
										>
											{!showPassword ? (
												<Eye className='w-full' />
											) : (
												<EyeOff className='w-full' />
											)}
										</span>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full'>
						Iniciar Sesión
					</Button>
				</form>
				<SelectAuth title='¿No tienes una cuenta?' linkText='Registrarse' href='/auth/register' />
			</Form>
		</div>
	);
};
