import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Loader2 } from 'lucide-react';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { loginFormSchema } from '@/schemas/zSchemas';
import { SelectAuth } from '..';
import { useAuthStore } from '@/hooks';

export const LoginForm = ({ title }: { title: string }) => {
	const [showPassword, setShowPassword] = useState(false);
	const { startLogin, errorMessage, isLoginLoading } = useAuthStore();

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
		await startLogin({ email: values.email, password: values.password });
	};

	return (
		<div className='py-10'>
			<h1 className='text-center mb-5 text-2xl'>{title}</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 py-5'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className='focus-visible:ring-0 border-x-0 border-t-0 rounded-none shadow-none'
										placeholder='Dirección de correo electrónico'
										type='email'
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
											className='px-2 text-2xl absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
										>
											{!showPassword ? <BsEye /> : <BsEyeSlash />}
										</span>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='w-full flex gap-2 items-center dark:bg-primary'
						disabled={isLoginLoading}
					>
						{isLoginLoading ? (
							<>
								<Loader2 className='animate-spin text-primary-foreground' />
								Procesando...
							</>
						) : (
							'Iniciar Sesión'
						)}
					</Button>
				</form>
				<p className='text-sm md:text-base text-destructive text-center font-semibold'>
					{errorMessage}
				</p>
				<SelectAuth title='¿No tienes una cuenta?' linkText='Registrarse' href='/auth/register' />
			</Form>
		</div>
	);
};
