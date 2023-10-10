export const HeaderImage = ({ imageUrl }: { imageUrl: string }) => {
	return (
		<div className='w-full main-slider-container relative overflow-hidden'>
			<img className='w-full' src={imageUrl} alt='Portada de la película' />
			<div className='absolute bg-gradient-to-l z-0 from-transparent from-[80%] to-background/30 top-[0%] -bottom-10 left-0 right-0'></div>
			<div className='absolute bg-gradient-to-b from-transparent from-0% to-background top-[50%] bottom-0 left-0 right-0'></div>
			<div className='absolute bg-gradient-to-b from-transparent from-0% to-background top-[70%] bottom-0 left-0 right-0'></div>
		</div>
	);
};
