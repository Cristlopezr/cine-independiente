import { AuthLayout } from '../layout';
import { RegisterForm } from '@/components/auth/RegisterPage';

export const RegisterPage = () => {
	return (
		<AuthLayout>
			<RegisterForm title='Registrarse' />
		</AuthLayout>
	);
};
