import {
	Button,
	Form,
	Separator,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui';
import { useCineStore } from '@/hooks';
import { uploadMovieFormSchema, uploadMovieInputSchema } from '@/schemas/zSchemas';
import { useRef, useState } from 'react';
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
import { abortController } from '@/store/cine';

export const UploadMovieForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
	const [formStep, setFormStep] = useState(0);
	const { uploadProgress } = useCineStore();
	const [errorMessage, setErrorMessage] = useState('');

	const form = useForm<z.infer<typeof uploadMovieFormSchema>>({
		resolver: zodResolver(uploadMovieFormSchema),
		defaultValues: {
			title: '',
			synopsis: '',
			productionYear: '',
			movieImage: undefined,
			cast: [{ value: '' }],
			directors: [{ value: '' }],
			genres: [],
			writers: [{ value: '' }],
		},
		mode: 'onChange',
	});

	const onGoNext = async () => {
		if (formStep === 1) {
			const isValid = await form.trigger(['title', 'productionYear', 'synopsis', 'movieImage']);
			form.watch(['title', 'productionYear', 'synopsis', 'movieImage']);
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
		if (uploadProgress !== 100) {
			//!Error espera
			console.log('Espera conchetumare');
			return;
		}
		const values = form.getValues();
		console.log(values);
		//!Poner url de la imagen en los valores y enviarlos a la api
		//!Componente formulario enviado
		console.log('Formulario enviado');
	};

	const onGoBack = () => {
		setFormStep(formStep - 1);
	};

	const cancelUpload = () => {
		abortController.abort();
	};

	return (
		<div className='rounded-xl border bg-card text-card-foreground shadow'>
			<div className='flex items-center justify-between px-6 py-5'>
				<span className='p-0'>
					<h1 className='text-xl'>Subir película</h1>
					<p className='text-xs md:text-sm'>Paso {formStep + 1} de 4</p>
				</span>
				<TooltipProvider>
					<Tooltip delayDuration={100}>
						<TooltipTrigger>
							<BsXCircle className='text-2xl cursor-pointer' onClick={onCloseModal} />
						</TooltipTrigger>
						<TooltipContent sideOffset={8}>
							<p>Cerrar</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
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
							<div>
								<Button type='button' onClick={cancelUpload}>
									Cancelar subida
								</Button>
								<p className='pt-10 md:pt-20 text-center'>{uploadProgress}% subido</p>
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
