import { Link } from 'react-router-dom';
import { AuthLayout } from '../layout';
import { RegisterForm } from '@/components/auth/RegisterPage';

export const RegisterPage = () => {
	return (
		<AuthLayout>
			<h1 className='text-center mt-10 mb-5 text-2xl'>Registrarse</h1>
			<RegisterForm />
			<div className='relative flex justify-center text-sm'>
				<span className='bg-background px-2 text-muted-foreground'>¿Ya tienes una cuenta?</span>
				<Link to='/auth/login'>Iniciar Sesión</Link>
			</div>
		</AuthLayout>
	);
};