export const Header = ({ title, productionYear }: { title: string; productionYear: number }) => {
	return (
		<section className='font-semibold'>
			<p className='text-xl sm:text-2xl md:text-3xl xl:text-7xl'>{title}</p>
			<p className='text-gray-300 text-[10px] mt-[2px] md:text-xs lg:text-base lg:mt-5 font-thin'>
				{productionYear}
			</p>
		</section>
	);
};
