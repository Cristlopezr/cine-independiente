import { AuthLayout } from '../layout';
import { RegisterForm } from '@/components/auth/RegisterPage';
import { SelectAuth } from '@/components/auth';

export const RegisterPage = () => {
	return (
		<AuthLayout>
			<h1 className='text-center mt-10 mb-5 text-2xl'>Registrarse</h1>
			<RegisterForm />
			<SelectAuth title='¿Ya tienes una cuenta?' linkText='Iniciar Sesión' href='/auth/login' />
		</AuthLayout>
	);
};