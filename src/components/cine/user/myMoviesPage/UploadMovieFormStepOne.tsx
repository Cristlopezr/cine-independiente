import {
	Button,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui';
import { useAuthStore, useCineStore } from '@/hooks';
import { FormStepOneItem, UploadMovieForm } from '@/interfaces';
import { uploadMovieFormSchema } from '@/schemas/zSchemas';

import { useRef, useState } from 'react';
import { BsFillCheckCircleFill, BsQuestionCircle } from 'react-icons/bs';
import { MdFileUpload } from 'react-icons/md';
import * as z from 'zod';

export const formStepOneItems: FormStepOneItem[] = [
	{ id: 'title', label: 'Título', type: 'text', placeholder: 'Título' },
	{
		id: 'productionYear',
		label: 'Año en producción',
		type: 'text',
		placeholder: new Date().getFullYear().toString(),
	},
	{ id: 'synopsis', label: 'Sinopsis', placeholder: 'Sinopsis' },
	{ id: 'movieImage', label: '', type: 'file' },
];

interface UploadMovieFormStepOneProps {
	form: UploadMovieForm;
}

export const UploadMovieFormStepOne = ({ form }: UploadMovieFormStepOneProps) => {
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const [hasSelectedImage, setHasSelectedImage] = useState(false);
	const { user } = useAuthStore();

	const { startUploadingMovieImage } = useCineStore();

	//!Error local al seleccionar la imagen
	const [errorMessage, setErrorMessage] = useState('');

	const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e?.target?.files.length === 0) return;
		try {
			uploadMovieFormSchema
				.partial()
				.pick({ movieImage: true })
				.parse({ movieImage: e?.target?.files });
			setHasSelectedImage(true);
			await startUploadingMovieImage(e?.target?.files[0], user.id);
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
		<div className='grid-cols-[repeat(auto-fill,minmax(160px,1fr))] grid sm:grid-cols-2 gap-5'>
			{formStepOneItems.map(item => {
				if (item.id === 'movieImage') {
					return (
						<div key={item.id} className='col-span-2 justify-self-center'>
							{!hasSelectedImage ? (
								<div>
									<Input
										type={item.type}
										ref={inputFileRef}
										onChange={onInputChange}
										accept='.jpeg, .png, .jpg'
										className='hidden'
									/>
									<div className='relative flex flex-col items-center gap-3'>
										<MdFileUpload
											className='w-10 h-10 cursor-pointer'
											onClick={() => inputFileRef?.current?.click()!}
										/>
										<div className='relative'>
											<Button
												type='button'
												onClick={() => inputFileRef?.current?.click()!}
											>
												Seleccionar imagen
											</Button>
											<TooltipProvider>
												<Tooltip delayDuration={100}>
													<TooltipTrigger
														type='button'
														className='absolute -left-10 top-1/2 -translate-y-1/2'
													>
														<BsQuestionCircle className='text-lg' />
													</TooltipTrigger>
													<TooltipContent sideOffset={10} side='bottom'>
														<div className='flex flex-col gap-1 font-semibold'>
															<p>Formatos soportados</p>
															<ul className='flex gap-2 justify-between'>
																<li>.JPG</li>
																<li>.JPEG</li>
																<li>.PNG</li>
															</ul>
														</div>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</div>
										{!errorMessage ? (
											<p className='absolute top-full pt-1 text-xs text-center'>
												Opcional
											</p>
										) : (
											<p className='text-sm text-destructive font-semibold'>
												{errorMessage}
											</p>
										)}
									</div>
								</div>
							) : (
								<div className='flex flex-col items-center gap-3'>
									<BsFillCheckCircleFill className='w-10 h-10' />
									<p className='p-1'>Imagen seleccionada</p>
								</div>
							)}
						</div>
					);
				}
				if (item.id === 'synopsis')
					return (
						<div key={item.id} className='col-span-2'>
							<FormField
								control={form.control}
								name={item.id}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sinopsis *</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Sinopsis'
												className='resize-none'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					);
				return (
					<div key={item.id} className='max-[468px]:col-span-2'>
						<FormField
							control={form.control}
							name={item.id}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{item.label} *</FormLabel>
									<FormControl>
										<Input placeholder={item.placeholder} type={item.type} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				);
			})}
		</div>
	);
};
