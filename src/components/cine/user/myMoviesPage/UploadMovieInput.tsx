import { useRef, useState } from 'react';
import * as z from 'zod';
import { MdFileUpload } from 'react-icons/md';
import { Button, Input } from '@/components/ui';
import { useAuthStore } from '@/hooks';
import { uploadMovieInputSchema } from '@/schemas/zSchemas';
import { useCreateResolutionsMutation, useUploadMovieMutation } from '@/store/cine';

interface UploadMovieInputProps {
	setFormStep: (steap: number) => void;
}

const baseUrl = `${import.meta.env.VITE_API_MOVIE_BASE_URL}/video`;

export const UploadMovieInput = ({ setFormStep }: UploadMovieInputProps) => {
	const { user } = useAuthStore();
	const [errorMessage, setErrorMessage] = useState('');

	const [uploadMovie, { isLoading: isUploadMovieLoading }] = useUploadMovieMutation();
	const [createResolutions] = useCreateResolutionsMutation();

	const [hasUploadedVideo, setHasUploadedVideo] = useState(false);

	const inputFileRef = useRef<HTMLInputElement | null>(null);

	const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e?.target?.files || e?.target?.files?.length === 0) return;
		try {
			uploadMovieInputSchema.partial().pick({ file: true }).parse({ file: e?.target?.files });
			setHasUploadedVideo(true);
			const date = new Date().getTime().toString();
			setTimeout(async () => {
				setFormStep(1);
				if (!e?.target?.files) return;
				const { data, /* msg */ } = await uploadMovie({
					url: `${baseUrl}?id=${user.user_id}&date=${date}`,
					data: { movie: e.target.files[0] },
					date,
				}).unwrap();
				const encodedData = await createResolutions({
					url: `${baseUrl}/encode?id=${user.user_id}`,
					data,
				});
				console.log(encodedData);
				//! Await resolutions
				//! Await validation
			}, 1500);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errorMessage = error.errors[0]?.message;
				setErrorMessage(errorMessage);
				if (inputFileRef.current) {
					inputFileRef.current.value = '';
				}
			}
		}
	};

	return (
		<div className='flex flex-col items-center justify-center gap-5'>
			<Input
				type='file'
				className='hidden'
				name='video'
				ref={inputFileRef}
				onChange={onInputChange}
				accept='.mp4, .mkv, .mov, .avi'
			/>
			<button
				className={`flex flex-col items-center gap-4 ${isUploadMovieLoading ? 'text-muted' : ''}`}
				disabled={isUploadMovieLoading}
				onClick={() => inputFileRef?.current?.click()}
			>
				<div className='relative bg-accent p-8 w-21 h-21 rounded-full overflow-hidden'>
					<MdFileUpload className='w-16 h-16' />
					{hasUploadedVideo && (
						<div className='absolute -top-10 left-0 right-0 bottom-0 flex items-start justify-between gap-[1px]'>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => (
								<div
									key={index}
									className={`dark:bg-white bg-black bg-opacity-30 h-10 w-[2px] rounded-sm animate-upload-line${index}`}
								></div>
							))}
						</div>
					)}
				</div>
			</button>
			{/* <p className='text-sm pb-5 text-gray-600 dark:text-gray-400'>
				Tu película estará deshabilitada hasta que la publiques.
			</p> */}
			{/* Sacar mt-5 cuando se deje el parrafo */}
			<Button size='lg' className='mt-5' onClick={() => inputFileRef.current?.click()}>
				Seleccionar archivo
			</Button>
			{!!errorMessage ? (
				<p className='text-sm text-destructive font-semibold'>{errorMessage}</p>
			) : (
				<p className='text-sm'>.mp4 .avi .mov o .mkv</p>
			)}
		</div>
	);
};
