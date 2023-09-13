import * as z from 'zod';
import { verifyEmailFormSchema } from '@/schemas/zSchemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/hooks';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

export const VerifyEmailForm = () => {
	const {
		startVerifyEmail,
		user: { email },
		errorMessage,
		startRequestVerificationCode,
		isRequestCodeLoading,
		isCheckCodeLoading,
	} = useAuthStore();

	const [hasResentEmail, setHasResentEmail] = useState(false);

	const verifyForm = useForm<z.infer<typeof verifyEmailFormSchema>>({
		resolver: zodResolver(verifyEmailFormSchema),
		defaultValues: {
			code: '',
		},
	});

	const onPressVerify = async (values: z.infer<typeof verifyEmailFormSchema>) => {
		//!Se logea al usuario si es que verifica correctamente el codigo
		await startVerifyEmail({ email, code: values.code });
	};

	const onSendCode = async () => {
		try {
			await startRequestVerificationCode({ email });
			setHasResentEmail(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1 className='text-center mt-10 mb-5 text-2xl'>Verificación</h1>
			<p className='text-sm text-center mb-5'>Enviamos un código de verificación a {email}</p>
			<Form {...verifyForm}>
				<form onSubmit={verifyForm.handleSubmit(onPressVerify)} className='space-y-7 p-5'>
					<FormField
						control={verifyForm.control}
						name='code'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className='focus-visible:ring-0 border-x-0 border-t-0 rounded-none shadow-none'
										{...field}
										placeholder='Código de verificación'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='w-full flex gap-2 items-center'
						disabled={isCheckCodeLoading}
					>
						{isCheckCodeLoading ? (
							<>
								<Loader2 className='animate-spin text-primary-foreground' />
								Procesando...
							</>
						) : (
							'Verificar'
						)}
					</Button>
					<p className='text-sm text-center mt-5 text-destructive font-semibold'>{errorMessage}</p>
				</form>
			</Form>
			<div className='flex justify-center text-sm flex-col items-center gap-2 mt-5'>
				{!hasResentEmail ? (
					<>
						{!isRequestCodeLoading ? (
							<>
								<span className='bg-background px-2 text-muted-foreground'>
									¿No recibiste el código?
								</span>
								<button type='button' onClick={onSendCode} disabled={isRequestCodeLoading}>
									Reenviar
								</button>
							</>
						) : (
							<Loader2 className='animate-spin text-primary' />
						)}
					</>
				) : (
					<div className='flex flex-col items-center gap-5 justify-center'>
						<span className='bg-background px-2 text-muted-foreground'>Email reenviado</span>
						<CheckCircle />
					</div>
				)}
			</div>
		</div>
	);
};
