import { AlertType } from '@/cine/pages/user';
import { Avatar, AvatarFallback, AvatarImage, Button, Input, Loading } from '@/components/ui';
import { useAuthStore } from '@/hooks';
import { profileFormSchema } from '@/schemas/zSchemas';
import { useUpdateUserMutation } from '@/store/auth';
import { useUploadProfileImageMutation } from '@/store/cine';
import { useRef, useState } from 'react';
import * as z from 'zod';

export const ProfileImage = ({
	showHideAlert,
}: {
	showHideAlert: (alertType: AlertType, msg: string) => void;
}) => {
	const {
		user: { user_id, avatarUrl, name },
	} = useAuthStore();

	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [isUploadProfileImageLoading, setIsUploadProfileImageLoading] = useState(false);
	const [uploadProfileImage] = useUploadProfileImageMutation();
	const [updateUser] = useUpdateUserMutation();

	const startUploadingProfileImage = async (file: File) => {
		setIsUploadProfileImageLoading(true);
		try {
			const { imageUrl } = await uploadProfileImage({
				userId: user_id,
				image: file,
			}).unwrap();
			await updateUser({
				data: { avatarUrl: imageUrl },
				user_id,
			}).unwrap();
			setIsUploadProfileImageLoading(false);
			showHideAlert('success', 'Imagen actualizada con éxito');
		} catch (error: any) {
			setIsUploadProfileImageLoading(false);
			showHideAlert('error', error?.data?.msg);
		}
	};

	const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e?.target?.files.length === 0) return;
		setErrorMessage('');
		try {
			profileFormSchema
				.partial()
				.pick({ profileImage: true })
				.parse({ profileImage: e?.target?.files });

			await startUploadingProfileImage(e?.target?.files[0]);
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
			<Avatar
				onClick={() => inputFileRef?.current?.click()}
				className='w-[8rem] h-[8rem] cursor-pointer border-4 border-border-second'
			>
				<AvatarImage src={avatarUrl} />
				<AvatarFallback className='text-4xl'>
					<p>{name.slice(0, 1)}</p>
				</AvatarFallback>
			</Avatar>
			{isUploadProfileImageLoading ? (
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
					Cambiar imagen de perfil
				</Button>
			)}
			{errorMessage && <p className='text-destructive font-semibold'>{errorMessage}</p>}
		</div>
	);
};
