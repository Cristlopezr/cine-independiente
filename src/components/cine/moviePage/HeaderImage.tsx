export const HeaderImage = ({ imageUrl }: { imageUrl: string }) => {
	return (
		<div className='w-full'>
			<img className='w-full aspect-[16/9] object-cover' src={imageUrl} alt='Portada de la película' />
		</div>
	);
};
