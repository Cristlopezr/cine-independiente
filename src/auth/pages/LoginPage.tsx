import { LoginForm } from '@/components/auth/LoginPage';
import { AuthLayout } from '../layout';
import { SelectAuth } from '@/components/auth';

export const LoginPage = () => {
	return (
		<AuthLayout>
			<h1 className='text-center mt-10 mb-5 text-2xl'>Iniciar Sesión</h1>
			<LoginForm />
			<SelectAuth title='¿No tienes una cuenta?' linkText='Registrarse' href='/auth/register' />
		</AuthLayout>
	);
};
