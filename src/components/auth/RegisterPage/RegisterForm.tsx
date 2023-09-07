import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const formSchema = z
	.object({
		name: z.string().min(1, { message: 'Por favor ingresar un nombre' }),
		lastName: z.string().min(1, { message: 'Por favor ingresar un apellido' }),
		email: z
			.string()
			.min(1, {
				message: 'Por favor ingresar un email',
			})
			.email('Por favor ingresar un email válido'),
		password: z
			.string()
			.min(8, { message: 'Por favor ingresar una contraseña válida' })
			.refine(value => /[A-Z]/.test(value), {
				message: 'La contraseña debe contener al menos una mayúscula',
			})
			.refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
				message: 'La contraseña debe contener al menos un caracter especial',
			}),
		//!Validación de segunda contraseña
		confirmPassword: z.string(),
		/* .min(8, { message: 'Por favor ingresar una contraseña válida' })
			.refine(value => /[A-Z]/.test(value), {
				message: 'La contraseña debe contener al menos una mayúscula',
			})
			.refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
				message: 'La contraseña debe contener al menos un caracter especial',
			}), */
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Las contraseñas no coinciden',
		path: ['confirmPassword'],
	});

export const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [showPasswordHelp, setShowPasswordHelp] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});
	/* console.log(formSchema.safeParse(form.getValues())) */
	/* console.log(form.formState, !!form.formState.errors.password) */
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<div className='p-5'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
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
						name='lastName'
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
										/>
										<span
											onMouseEnter={() => setShowPasswordHelp(true)}
											onMouseLeave={() => setShowPasswordHelp(false)}
										>
											<small
												className={`absolute w-fit right-0 bg-secondary z-10 px-6 py-2 pointer-events-none rounded-sm text-muted-foreground text-xs ${
													showPasswordHelp ? 'opacity-100' : 'opacity-0'
												} transition-all duration-300 ease-in-out`}
											>
												<ul className='flex flex-col gap-1 list-disc'>
													<li>Al menos 8 caracteres</li>
													<li>Una mayúscula</li>
													<li>Un carácter especial</li>
												</ul>
											</small>
											<HelpCircle className='absolute top-1/2 -translate-y-1/2 right-12 w-4 sm:w-5' />
										</span>
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
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className='relative'>
										<Input
											className='focus-visible:ring-0 border-x-0 border-t-0 rounded-none shadow-none'
											placeholder='Contraseña'
											{...field}
											type={`${!showConfirmPassword ? 'password' : 'text'}`}
											autoComplete='new-password'
											onInvalid={e => e.preventDefault()}
										/>
										<span
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
											className='w-5 sm:w-8 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
										>
											{!showConfirmPassword ? (
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
						Registrarse
					</Button>
				</form>
			</Form>
		</div>
	);
};
