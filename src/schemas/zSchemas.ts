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
		confirmPassword: z.string().trim(),
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
	code: z
		.string()
		.min(1, { message: 'Por favor ingresar un código de verificación' })
		.regex(/^\d+$/, { message: 'Por favor ingresar solo números' }),
});

const MAX_FILE_SIZE_GB = 60;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_GB * Math.pow(2, 30); // 1 GB = 2^30 bytes
const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/mov', 'video/avi', 'video/mkv'];
export const uploadMovieInputSchema = z.object({
	file: z
		.any()
		.refine(files => files?.length === 1, 'Por favor seleccionar un video')
		.refine(files => files?.[0]?.size <= MAX_FILE_SIZE_BYTES, 'El tamaño máximo del archivo es de 60GB')
		.refine(
			files => ACCEPTED_VIDEO_TYPES.includes(files[0].type),
			'Los formatos soportados son .MP4 .MOV .AVI .MKV'
		),
});

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const CURRENT_YEAR = new Date().getFullYear();

export const uploadMovieFormSchema = z.object({
	title: z.string().min(1, { message: 'Por favor ingresar un título' }),
	synopsis: z.string().min(1, { message: 'Por favor ingresar una sinopsis' }),
	productionYear: z
		.string()
		.min(4, { message: 'Por favor ingresar un año válido' })
		.max(4, { message: 'Por favor ingresar un año válido' })
		.regex(/^\d+$/, { message: 'Por favor ingresar un año válido' })
		.refine(value => Number(value) <= CURRENT_YEAR && Number(value) >= 1900, {
			message: 'Por favor ingresar un año válido',
		}),
	movieImage: z
		.any()
		.refine(files => {
			if (!files) return false;
			return true;
		}, 'Por favor seleccionar una imagen')
		.refine(
			files => ACCEPTED_IMAGE_TYPES.includes(files?.[0].type),
			'Los formatos soportados son .JPG .JPEG .PNG'
		),
	directors: z.array(
		z.object({
			name: z.string().min(1, { message: 'Por favor ingresar un director' }),
		})
	),
	writers: z.array(
		z.object({
			name: z.string().min(1, { message: 'Por favor ingresar un guionista' }),
		})
	),
	genres: z.array(z.string()).refine(value => value.some(item => item), {
		message: 'Por favor seleccionar al menos un género',
	}),
	cast: z.array(
		z.object({
			name: z.string().min(1, { message: 'Por favor ingresar un actor' }),
		})
	),
});
