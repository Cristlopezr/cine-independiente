import { AlertType } from '@/cine/pages/user';
import { Button, Input, Loading } from '@/components/ui';
import { DetailedMovie } from '@/interfaces';
import { uploadMovieFormSchema } from '@/schemas/zSchemas';
import { useUpdateMovieImageMutation, useUpdateMovieMutation } from '@/store/cine';
import { useRef, useState } from 'react';
import * as z from 'zod';

export const MovieImage = ({
	movie,
	showHideAlert,
}: {
	movie: DetailedMovie;
	showHideAlert: (alertType: AlertType, msg: string) => void;
}) => {
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [isUploadImageLoading, setIsUploadImageLoading] = useState(false);
	const [updateImage] = useUpdateMovieImageMutation();
	const [updateMovie] = useUpdateMovieMutation();

	const startUploadingMovieImage = async (file: File) => {
		setIsUploadImageLoading(true);
		try {
			const { imageUrl } = await updateImage({
				userId: movie.user_id,
				image: file,
				date: movie.date,
			}).unwrap();
			await updateMovie({
				user_id_date: movie.user_id_date,
				movie_id: movie.movie_id,
				data: { imageUrl: imageUrl },
			}).unwrap();
			setIsUploadImageLoading(false);
			showHideAlert('success', 'Película actualizada con éxito.');
		} catch (error: any) {
			console.log(error);
			setIsUploadImageLoading(false);
			showHideAlert('error', 'Ha ocurrido un error al actualizar la película.');
			setErrorMessage(error?.data?.msg);
		}
	};

	const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e?.target?.files.length === 0) return;
		setErrorMessage('');
		try {
			uploadMovieFormSchema
				.partial()
				.pick({ movieImage: true })
				.parse({ movieImage: e?.target?.files });

			await startUploadingMovieImage(e?.target?.files[0]);
			if (inputFileRef.current) {
				inputFileRef.current.value = '';
			}
		} catch (error: any) {
			if (inputFileRef.current) {
				inputFileRef.current.value = '';
			}
			if (error instanceof z.ZodError) {
				const imageZodErrorMessage = error.errors[0]?.message;
				setErrorMessage(imageZodErrorMessage);
				return;
			}
		}
	};

	return (
		<div className='flex flex-col gap-5 items-center justify-center'>
			<Input
				type='file'
				ref={inputFileRef}
				onChange={onInputChange}
				accept='.jpeg, .png, .jpg'
				className='hidden'
			/>
			<div
				onClick={() => inputFileRef?.current?.click()}
				className='cursor-pointer border-4 border-border-second'
			>
				<img
					className='aspect-[16/9] object-cover'
					src={movie.imageUrl}
					alt='Imagen de la película'
				/>
			</div>
			{isUploadImageLoading ? (
				<Button
					variant='outline'
					className='flex items-center gap-3 w-[225px]'
					type='button'
					disabled
				>
					<Loading className='w-6 h-6' />
					Procesando...
				</Button>
			) : (
				<Button
					variant='outline'
					onClick={() => inputFileRef?.current?.click()}
					className='font-semibold w-[225px]'
				>
					Cambiar imagen
				</Button>
			)}
			{errorMessage && <p className='text-destructive font-semibold'>{errorMessage}</p>}
		</div>
	);
};
