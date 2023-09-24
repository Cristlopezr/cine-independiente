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
	Loading,
} from '@/components/ui';
import { useFieldArray } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { BsX } from 'react-icons/bs';
import { UploadMovieForm } from '@/interfaces';
import { useGetGenresQuery } from '@/store/cine/cineApiSlice';

interface UploadMovieFormStepThreeProps {
	form: UploadMovieForm;
}

export const UploadMovieFormStepThree = ({ form }: UploadMovieFormStepThreeProps) => {
	const { data: genres, isLoading, isError } = useGetGenresQuery();

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
						name={`writers.${index}.name`}
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
					onClick={() => append({ name: '' })}
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
						{isError ? (
							<p className='text-center text-destructive font-semibold pt-5'>
								Error al obtener los géneros
							</p>
						) : (
							<>
								{isLoading ? (
									<div className='pt-5'>
										<Loading text='Obteniendo géneros...' />
									</div>
								) : (
									<div className='grid gap-y-2 gap-x-4 grid-cols-[repeat(auto-fill,minmax(140px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]'>
										{genres!.map(genre => (
											<FormField
												key={genre.genre_id}
												control={form.control}
												name='genres'
												render={({ field }) => {
													return (
														<FormItem
															key={genre.genre_id}
															className='flex flex-row items-start space-x-3 space-y-0'
														>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(
																		genre.genre_id
																	)}
																	onCheckedChange={checked => {
																		return checked
																			? field.onChange([
																					...field.value,
																					genre.genre_id,
																			  ])
																			: field.onChange(
																					field.value?.filter(
																						value =>
																							value !==
																							genre.genre_id
																					)
																			  );
																	}}
																/>
															</FormControl>
															<FormLabel className='font-normal'>
																{genre.name}
															</FormLabel>
														</FormItem>
													);
												}}
											/>
										))}
									</div>
								)}
							</>
						)}

						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};
