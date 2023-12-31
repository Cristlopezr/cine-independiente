import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash, BsQuestionCircle } from 'react-icons/bs';
import { Loader2 } from 'lucide-react';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { registerFormSchema } from '@/schemas/zSchemas';
import { useAuthStore } from '@/hooks';
import { SelectAuth } from '..';

export const RegisterForm = ({ title }: { title: string }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [showPasswordHelp, setShowPasswordHelp] = useState(false);

	const { startRegister, isRegisterLoading, startRequestVerificationCode } = useAuthStore();

	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: '',
			lastname: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
		try {
			await startRegister(values);
			await startRequestVerificationCode({ email: values.email });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='py-10'>
			<h1 className='text-center mb-5 text-2xl'>{title}</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7 py-5'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className='focus-visible:ring-0 border-x-0 border-t-0 rounded-none shadow-none'
										placeholder='Nombre'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastname'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className='focus-visible:ring-0 border-x-0 border-t-0 rounded-none shadow-none'
										placeholder='Apellido'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
											onMouseEnter={() => setShowPasswordHelp(true)}
											onMouseLeave={() => setShowPasswordHelp(false)}
										>
											<small
												className={`absolute right-0 top-8 bg-secondary z-10 px-8 py-3 pointer-events-none rounded-sm text-muted-foreground text-xs ${
													showPasswordHelp ? 'opacity-100' : 'opacity-0'
												} transition-all duration-300 ease-in-out`}
											>
												<ul className='flex flex-col gap-2 list-disc'>
													<li>Al menos 8 caracteres</li>
													<li>Una mayúscula</li>
													<li>Un carácter especial</li>
												</ul>
											</small>
											<BsQuestionCircle className='absolute top-2 right-14 text-lg' />
										</span>
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
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className='relative'>
										<Input
											className='focus-visible:ring-0 border-x-0 border-t-0 rounded-none shadow-none'
											placeholder='Confirmar contraseña'
											{...field}
											type={`${!showConfirmPassword ? 'password' : 'text'}`}
											autoComplete='new-password'
											spellCheck={false}
										/>
										<span
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
											className='px-2 text-2xl absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
										>
											{!showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
										</span>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='w-full flex gap-2 items-center'
						disabled={isRegisterLoading}
					>
						{isRegisterLoading ? (
							<>
								<Loader2 className='animate-spin text-primary-foreground' />
								Procesando...
							</>
						) : (
							'Registrarse'
						)}
					</Button>
				</form>
				<SelectAuth title='¿Ya tienes una cuenta?' linkText='Iniciar Sesión' href='/auth/login' />
			</Form>
		</div>
	);
};
