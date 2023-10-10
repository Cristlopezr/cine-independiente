import { Button, Form, Loading, Separator } from '@/components/ui';
import { useAuthStore, useCineStore } from '@/hooks';
import { uploadMovieFormSchema } from '@/schemas/zSchemas';
import { useEffect, useState } from 'react';
import { BsFillCheckCircleFill, BsFillExclamationTriangleFill, BsXCircle } from 'react-icons/bs';
import * as z from 'zod';
import {
	UploadMovieFormStepOne,
	UploadMovieFormStepThree,
	UploadMovieFormStepTwo,
	UploadMovieInput,
} from '.';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDeleteMovieMutation, useUpdateMovieInfoMutation } from '@/store/cine';
import { Alert, CustomTooltip } from '@/components';
import { Progress } from '@/components/cine';

export const UploadMovieForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
	const [formStep, setFormStep] = useState(0);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [abortController, setAbortController] = useState<AbortController | undefined>();
	const [deleteMovie] = useDeleteMovieMutation();
	const {
		uploadProgress,
		movieToUpload,
		onSetUploadProgress,
		errorMessage: uploadErrorMessage,
		onErrorMessage,
		movieUploadSuccessMessage,
		onMovieUploadSuccessMessage,
	} = useCineStore();

	useEffect(() => {
		onErrorMessage('');
		onMovieUploadSuccessMessage('');
	}, []);

	const [updateMovieInfo, { isLoading }] = useUpdateMovieInfoMutation();
	const { user } = useAuthStore();
	const form = useForm<z.infer<typeof uploadMovieFormSchema>>({
		resolver: zodResolver(uploadMovieFormSchema),
		defaultValues: {
			title: '',
			synopsis: '',
			productionYear: '',
			movieImage: undefined,
			cast: [{ name: '' }],
			directors: [{ name: '' }],
			genres: [],
			writers: [{ name: '' }],
		},
		mode: 'onChange',
	});

	const onGoNext = async () => {
		if (formStep === 1) {
			const isValid = await form.trigger(['title', 'productionYear', 'synopsis']);
			if (!movieToUpload.imageUrl) {
				const isImageValid = await form.trigger(['movieImage']);
				if (!isImageValid) return;
			}
			if (!isValid) return;
		}
		if (formStep === 2) {
			const isValid = await form.trigger(['directors', 'cast']);
			if (!isValid) return;
		}
		if (formStep === 3) {
			const isValid = await form.trigger(['writers', 'genres']);
			if (!isValid) return;
		}
		if (formStep !== 3) {
			setFormStep(formStep + 1);
			return;
		}

		const cleanedFormValues = cleanFormValues();
		try {
			setIsFormSubmitted(true);
			//!Actualizar pelicula movieUpdated.msg
			await updateMovieInfo(cleanedFormValues).unwrap();
		} catch (error: any) {
			setErrorMessage(error?.data.msg);
		}
	};

	const onGoBack = () => {
		setFormStep(formStep - 1);
	};

	const cancelUpload = () => {
		if (uploadProgress !== 100 && !uploadErrorMessage) {
			abortController?.abort();
		}

		deleteMovie(movieToUpload.id!);

		onSetUploadProgress(0);
		onCloseModal();
	};

	const cleanFormValues = () => {
		const values = form.getValues();
		const { movieImage, ...newValues } = values;
		const formValues = {
			...newValues,
			date: movieToUpload.date,
			imageUrl: movieToUpload.imageUrl,
			productionYear: Number(values.productionYear),
			user_id: user.user_id,
			enabled: true,
			explicitContent: false,
			user_id_date: user.user_id + movieToUpload.date,
			duration: 0,
			//!Enabled por ahora true;
		};
		return formValues;
	};

	return (
		<div className='rounded-xl border bg-card text-card-foreground shadow-md'>
			<div className='flex items-center justify-between px-6 py-5'>
				<span className='p-0'>
					<h1 className='text-xl'>Subir película</h1>
					<p className='text-xs md:text-sm'>Paso {formStep + 1} de 4</p>
				</span>

				<CustomTooltip>
					{formStep !== 0 && uploadProgress !== 100 && !uploadErrorMessage ? (
						<Alert
							alertDialogAction='Cancelar carga'
							alertDialogCancel='Volver atrás'
							alertDialogDescription='La carga de tu película se cancelará. Esta acción no se puede deshacer.'
							alertDialogTitle='¿Estás seguro?'
							onAction={cancelUpload}
							trigger={<BsXCircle className='text-2xl cursor-pointer text-destructive' />}
						/>
					) : formStep !== 0 && !isFormSubmitted && !uploadErrorMessage ? (
						<Alert
							alertDialogAction='Cancelar carga'
							alertDialogCancel='Volver atrás'
							alertDialogDescription='Si no completas el formulario la carga de tu película se cancelará. Esta acción no se puede deshacer.'
							alertDialogTitle='¿Estás seguro?'
							onAction={cancelUpload}
							trigger={<BsXCircle className='text-2xl cursor-pointer text-destructive' />}
						/>
					) : (
						<BsXCircle
							className='text-2xl cursor-pointer text-destructive'
							onClick={onCloseModal}
						/>
					)}
				</CustomTooltip>
			</div>
			<Separator />
			<div>
				{formStep === 0 && (
					<div className='flex items-center justify-center p-20'>
						<UploadMovieInput setFormStep={setFormStep} setAbortController={setAbortController} />
					</div>
				)}
				{formStep !== 0 && (
					<Form {...form}>
						<div className='min-h-[490px] gap-5 md:gap-8 grid md:grid-cols-[1fr,200px] lg:grid-cols-[1fr,350px] p-5'>
							{!isFormSubmitted ? (
								<form>
									{formStep === 1 && <UploadMovieFormStepOne form={form} />}
									{formStep === 2 && <UploadMovieFormStepTwo form={form} />}
									{formStep === 3 && <UploadMovieFormStepThree form={form} />}
								</form>
							) : (
								<>
									{isLoading ? (
										<div className='md:pt-32 flex flex-col items-center gap-5'>
											<div className='text-center'>
												<p>Procesando...</p>
												<p>Podría tardar un momento</p>
											</div>
											<Loading />
										</div>
									) : (
										<div className='flex flex-col items-center md:pt-32 gap-5'>
											{!!errorMessage ? (
												<>
													<p className='text-destructive font-semibold'>
														{errorMessage}
													</p>
													<BsFillExclamationTriangleFill className='w-8 h-8 text-destructive' />
												</>
											) : (
												<>
													<p>Información guardada</p>
													<BsFillCheckCircleFill className='w-8 h-8' />
													<p>
														Si tu película ya se ha subido, puedes cerrar esta
														ventana
													</p>
												</>
											)}
										</div>
									)}
								</>
							)}
							<div className='flex flex-col items-center pt-10 gap-5'>
								{!uploadErrorMessage ? (
									<>
										{!movieUploadSuccessMessage ? (
											<>
												<Progress
													progress={uploadProgress}
													text='Subiendo película'
												/>
												<Alert
													alertDialogAction='Cancelar carga'
													alertDialogCancel='Volver atrás'
													alertDialogDescription='La carga de tu película se cancelará. Esta acción no se puede deshacer.'
													alertDialogTitle='¿Estás seguro?'
													onAction={cancelUpload}
													trigger={
														<div className='h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'>
															Cancelar carga
														</div>
													}
												/>
											</>
										) : (
											<div className='flex flex-col text-center gap-5'>
												<p>Tu película se ha subido con éxito.</p>
												<p>
													Se procederá con la compresión y validación del contenido.
													En caso de éxito o error, se te notificará por correo
													electrónico.
												</p>
											</div>
										)}
									</>
								) : (
									<p>{uploadErrorMessage}</p>
								)}
							</div>
							{!isFormSubmitted && (
								<div className='flex items-end justify-between'>
									{formStep !== 1 && (
										<Button onClick={onGoBack} type='button'>
											Anterior
										</Button>
									)}
									{formStep !== 3 ? (
										<Button onClick={onGoNext} className='ml-auto' type='button'>
											Siguiente
										</Button>
									) : (
										<Button type='button' onClick={onGoNext}>
											Guardar
										</Button>
									)}
								</div>
							)}
						</div>
					</Form>
				)}
			</div>
		</div>
	);
};
