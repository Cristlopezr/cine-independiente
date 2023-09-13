import { LoginForm } from '@/components/auth/LoginPage';
import { AuthLayout } from '../layout';

export const LoginPage = () => {
	return (
		<AuthLayout>
			<LoginForm title='Iniciar Sesión' />
		</AuthLayout>
	);
};
