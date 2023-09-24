import { Button, Form, Loading, Separator } from '@/components/ui';
import { useAuthStore, useCineStore } from '@/hooks';
import { uploadMovieFormSchema } from '@/schemas/zSchemas';
import { useState } from 'react';
import { BsXCircle } from 'react-icons/bs';
import * as z from 'zod';
import {
	UploadMovieFormStepOne,
	UploadMovieFormStepThree,
	UploadMovieFormStepTwo,
	UploadMovieInput,
} from '.';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { abortController, abortControllerResolution, useUploadMovieInfoMutation } from '@/store/cine';
import { Alert, CustomTooltip } from '@/components';
import { Progress } from '@/components/cine';

export const UploadMovieForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
	const [formStep, setFormStep] = useState(0);
	const { uploadProgress, movieToUpload, onSetUploadProgress, isCreateResolutionsLoading } = useCineStore();

	const [uploadMovieInfo] = useUploadMovieInfoMutation();
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
			const isValid = await form.trigger(['title', 'productionYear', 'synopsis', 'movieImage']);
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
		await uploadMovieInfo(cleanedFormValues);
		//!Componente formulario enviado
		console.log('Formulario enviado');
	};

	const onGoBack = () => {
		setFormStep(formStep - 1);
	};

	const cancelUpload = () => {
		if (uploadProgress !== 100) {
			abortController.abort();
			onSetUploadProgress(0);
		}
		if (isCreateResolutionsLoading) {
			abortControllerResolution.abort();
		}
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
					{formStep !== 0 && uploadProgress !== 100 ? (
						<Alert
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
						<UploadMovieInput setFormStep={setFormStep} />
					</div>
				)}
				{formStep !== 0 && (
					<Form {...form}>
						<form className='min-h-[490px] gap-5 grid md:grid-cols-[1fr,200px] lg:grid-cols-[1fr,350px] p-5'>
							{formStep === 1 && <UploadMovieFormStepOne form={form} />}
							{formStep === 2 && <UploadMovieFormStepTwo form={form} />}
							{formStep === 3 && <UploadMovieFormStepThree form={form} />}

							<div className='flex flex-col items-center pt-10 gap-5'>
								{uploadProgress !== 100 && (
									<Progress progress={uploadProgress} text='Subiendo película' />
								)}

								{isCreateResolutionsLoading && (
									<div className='flex flex-col gap-5 text-center'>
										<div>
											<p>Realizando compresión...</p>
											<p className='text-xs'>Podría tardar unos minutos</p>
										</div>
										<Loading />
									</div>
								)}
								{/* {showExplicitValidation && <p>Válidando película</p>} */}

								<Alert
									onAction={cancelUpload}
									trigger={
										<div className='h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'>
											Cancelar carga
										</div>
									}
								/>
							</div>
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
						</form>
					</Form>
				)}
			</div>
		</div>
	);
};
