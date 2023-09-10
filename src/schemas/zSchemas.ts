import * as z from 'zod';

export const registerFormSchema = z
	.object({
		name: z.string().min(1, { message: 'Por favor ingresar un nombre' }).trim(),
		lastname: z.string().min(1, { message: 'Por favor ingresar un apellido' }).trim(),
		email: z
			.string()
			.min(1, {
				message: 'Por favor ingresar un email',
			})
			.email('Por favor ingresar un email válido')
			.trim(),
		password: z
			.string()
			.min(8, { message: 'Por favor ingresar una contraseña válida' })
			.trim()
			.refine(value => /[A-Z]/.test(value), {
				message: 'La contraseña debe contener al menos una mayúscula',
			})
			.refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
				message: 'La contraseña debe contener al menos un caracter especial',
			}),
		//!Validación de segunda contraseña
		confirmPassword: z.string().trim(),
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

export const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: 'Por favor ingresar un email',
		})
		.trim()
		.email('Por favor ingresar un email válido'),
	password: z.string().min(1, { message: 'Por favor ingresar una contraseña' }).trim(),
});

export const verifyEmailFormSchema = z.object({
	code: z.string().min(1, { message: 'Por favor ingresar un código de verificación' }),
});
