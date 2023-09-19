import {
	Button,
	Checkbox,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components/ui';
import { useFieldArray } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { BsX } from 'react-icons/bs';
import { UploadMovieForm } from '@/interfaces';

//!Traer de la db
export const genres = [
	{ id: 'romance', label: 'Romance' },
	{ id: 'accion', label: 'Acción' },
	{ id: 'anime', label: 'Anime' },
	{ id: 'cortos', label: 'Cortos' },
	{ id: 'comedia', label: 'Comedia' },
	{ id: 'crimen', label: 'Crimen' },
	{ id: 'deportes', label: 'Deportes' },
	{ id: 'documentales', label: 'Documentales' },
	{ id: 'terror', label: 'Terror y Suspenso' },
	{ id: 'fantasia', label: 'Fantasía y Ciencia ficción' },
];

interface UploadMovieFormStepThreeProps {
	form: UploadMovieForm;
}

export const UploadMovieFormStepThree = ({ form }: UploadMovieFormStepThreeProps) => {
	const { fields, append, remove } = useFieldArray({
		name: 'writers',
		control: form.control,
	});

	return (
		<div className='space-y-5 md:space-y-8'>
			<div className='pr-5'>
				{fields.map((field, index) => (
					<FormField
						control={form.control}
						key={field.id}
						name={`writers.${index}.value`}
						render={({ field }) => (
							<FormItem>
								<FormLabel className={cn(index !== 0 && 'sr-only')}>Guionista *</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input {...field} placeholder='Guionista' />
										{index !== 0 && (
											<BsX
												className='cursor-pointer text-3xl absolute top-1/2 -translate-y-1/2 -right-8'
												onClick={() => remove(index)}
											/>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='mt-2'
					onClick={() => append({ value: '' })}
				>
					Agregar otro guionista
				</Button>
			</div>
			<FormField
				control={form.control}
				name='genres'
				render={() => (
					<FormItem>
						<div className='mb-4'>
							<FormLabel className='text-base'>Género</FormLabel>
							<FormDescription>Selecciona al menos un género</FormDescription>
						</div>
						<div className='grid gap-y-2 gap-x-4 grid-cols-[repeat(auto-fill,minmax(140px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]'>
							{genres.map(genre => (
								<FormField
									key={genre.id}
									control={form.control}
									name='genres'
									render={({ field }) => {
										return (
											<FormItem
												key={genre.id}
												className='flex flex-row items-start space-x-3 space-y-0'
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(genre.id)}
														onCheckedChange={checked => {
															return checked
																? field.onChange([...field.value, genre.id])
																: field.onChange(
																		field.value?.filter(
																			value => value !== genre.id
																		)
																  );
														}}
													/>
												</FormControl>
												<FormLabel className='font-normal'>{genre.label}</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};
