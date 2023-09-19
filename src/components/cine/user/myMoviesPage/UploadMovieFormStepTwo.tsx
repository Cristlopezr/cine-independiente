import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { UploadMovieForm } from '@/interfaces';
import { cn } from '@/lib/utils';
import { useFieldArray } from 'react-hook-form';
import { BsX } from 'react-icons/bs';

interface UploadMovieFormStepTwoProps {
	form: UploadMovieForm;
}

export const UploadMovieFormStepTwo = ({ form }: UploadMovieFormStepTwoProps) => {
	const {
		fields: directorFields,
		append: appendDirector,
		remove: removeDirector,
	} = useFieldArray({
		name: 'directors',
		control: form.control,
	});

	const {
		fields: castFields,
		append: appendCast,
		remove: removeCast,
	} = useFieldArray({
		name: 'cast',
		control: form.control,
	});

	return (
		<div className='grid min-[1110px]:grid-cols-2 gap-y-5 gap-x-10'>
			<div className='pr-5 sm:pr-0 sm:w-3/4 min-[1110px]:w-full'>
				{directorFields.map((field, index) => (
					<FormField
						control={form.control}
						key={field.id}
						name={`directors.${index}.value`}
						render={({ field }) => (
							<FormItem>
								<FormLabel className={cn(index !== 0 && 'sr-only')}>Director *</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input {...field} placeholder='Director' />
										{index !== 0 && (
											<BsX
												className='cursor-pointer text-3xl absolute top-1/2 -translate-y-1/2 -right-8'
												onClick={() => removeDirector(index)}
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
					onClick={() => appendDirector({ value: '' })}
				>
					Agregar otro director
				</Button>
			</div>
			<div className='pr-5 sm:pr-0 sm:w-3/4 min-[1110px]:w-full'>
				{castFields.map((field, index) => (
					<FormField
						control={form.control}
						key={field.id}
						name={`cast.${index}.value`}
						render={({ field }) => (
							<FormItem>
								<FormLabel className={cn(index !== 0 && 'sr-only')}>Elenco *</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input {...field} placeholder='Actor' />
										{index !== 0 && (
											<BsX
												className='cursor-pointer text-3xl absolute top-1/2 -translate-y-1/2 -right-8'
												onClick={() => removeCast(index)}
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
					onClick={() => appendCast({ value: '' })}
				>
					Agregar otro actor
				</Button>
			</div>
		</div>
	);
};
