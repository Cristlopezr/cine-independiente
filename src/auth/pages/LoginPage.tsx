import { LoginForm } from '@/components/auth/LoginPage';
import { AuthLayout } from '../layout';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
	return (
		<AuthLayout>
			<h1 className='text-center mt-10 mb-5 text-2xl'>Iniciar Sesión</h1>
			<LoginForm />
			<div className='relative flex justify-center text-sm'>
				<span className='bg-background px-2 text-muted-foreground'>¿No tienes una cuenta?</span>
				<Link to='/auth/register'>Registrarse</Link>
			</div>
		</AuthLayout>
	);
};