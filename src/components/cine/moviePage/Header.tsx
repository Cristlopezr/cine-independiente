export const Header = ({ title, productionYear }: { title: string; productionYear: number }) => {
	return (
		<section className='font-semibold'>
			<p className='md:text-5xl sm:text-4xl xl:text-7xl'>{title}</p>
			<p className='text-gray-300 mt-5 font-thin'>{productionYear}</p>
		</section>
	);
};
