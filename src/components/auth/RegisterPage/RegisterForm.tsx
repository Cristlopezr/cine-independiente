import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
} from '@/components/ui';


const formSchema = z.object({
	name: z.string().min(1, { message: 'Por favor ingresar un nombre' }),
	lastName: z.string().min(1, { message: 'Por favor ingresar un apellido' }),
	email: z
		.string()
		.min(1, {
			message: 'Por favor ingresar un email',
		})
		.email('Por favor ingresar un email válido'),
	password: z.string().min(1, { message: 'Por favor ingresar una contraseña' }),
	password2: z.string().min(1, { message: 'Por favor confirmar contraseña' }),
});

export const RegisterForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			lastName: '',
			email: '',
			password: '',
			password2: '',
		},
	});

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
									<Input
										className='focus-visible:ring-0 border-x-0 border-t-0 rounded-none shadow-none'
										placeholder='Contraseña'
										{...field}
										type='password'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password2'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className='focus-visible:ring-0 border-x-0 border-t-0 rounded-none shadow-none'
										placeholder='Confirmar contraseña'
										{...field}
										type='password'
									/>
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
