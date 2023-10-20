import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input, Loading } from '@/components/ui';
import { AuthLayout } from '../layout';
import { BsCheckLg, BsEye, BsEyeSlash, BsQuestionCircle } from 'react-icons/bs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetPasswordFormSchema } from '@/schemas/zSchemas';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '@/store/auth';

export const ResetPassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [showPasswordHelp, setShowPasswordHelp] = useState(false);
	const [seconds, setSeconds] = useState(5);
	const [resetPassword, { isLoading, isError, isSuccess }] = useResetPasswordMutation();
	const [errorMessage, setErrorMessage] = useState('');
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
		resolver: zodResolver(resetPasswordFormSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
		const { password } = values;
		try {
			await resetPassword({
				newPassword: password,
				user_id: searchParams.get('id') || '',
			}).unwrap();
			setInterval(() => {
				setSeconds(prevSecond => prevSecond - 1);
			}, 1000);
			setTimeout(() => {
				navigate('/auth/login', { replace: true });
			}, 5000);
		} catch (error: any) {
			setErrorMessage(error?.data?.msg);
		}
	};

	return (
		<AuthLayout>
			<div className='py-10 flex flex-col gap-8'>
				{isSuccess ? (
					<div className='flex flex-col gap-8 items-center justify-center'>
						<p className='text-xl'>La contraseña se ha cambiado con éxito.</p>
						<BsCheckLg className='h-8 w-8 text-green-500' />
						<p>Serás redirigido a la página principal dentro de:</p>
						<p className='text-2xl'>{seconds}</p>
					</div>
				) : (
					<>
						<h1 className='text-2xl text-center'>Nueva contraseña</h1>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className='relative'>
													<Input
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
															className={`absolute -left-28 top-8 bg-secondary z-10 px-8 py-3 pointer-events-none rounded-sm text-muted-foreground text-xs ${
																showPasswordHelp ? 'opacity-100' : 'opacity-0'
															} transition-all duration-300 ease-in-out`}
														>
															<ul className='flex flex-col gap-2 list-disc'>
																<li>Al menos 8 caracteres</li>
																<li>Una mayúscula</li>
																<li>Un carácter especial</li>
															</ul>
														</small>
														<BsQuestionCircle className='absolute top-1/2 -translate-y-1/2 -left-8 text-base' />
													</span>
													<span
														onClick={() => setShowPassword(!showPassword)}
														className='px-2 text-xl absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
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
														placeholder='Confirmar contraseña'
														{...field}
														type={`${!showConfirmPassword ? 'password' : 'text'}`}
														autoComplete='new-password'
														spellCheck={false}
													/>
													<span
														onClick={() =>
															setShowConfirmPassword(!showConfirmPassword)
														}
														className='px-2 text-xl absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
													>
														{!showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
													</span>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{isLoading ? (
									<Button className='flex items-center gap-3 w-full'>
										<Loading className='w-6 h-6' /> Procesando...
									</Button>
								) : (
									<Button className='w-full'>Enviar</Button>
								)}
							</form>
						</Form>
					</>
				)}
				{isError && <p className='text-center text-destructive font-semibold'>{errorMessage}</p>}
			</div>
		</AuthLayout>
	);
};
