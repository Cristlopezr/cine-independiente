import { CineLayout } from '../layout';
import { MainCarousel, MovieCarousel, settings169, settings914 } from '@/components/cine/carousel';

export const CinePage = () => {
	return (
		<CineLayout>
			<MainCarousel />
			<section className='mt-5 flex flex-col gap-5 px-5 lg:px-12'>
				<MovieCarousel
					title='Fantasía y Ciencia ficción'
					genre='Fantasía y Ciencia ficción'
					aspect='aspect-[9/14]'
					settings={settings914}
				/>
				<MovieCarousel
					title='Comedia'
					genre='Comedia'
					aspect='aspect-[16/9]'
					settings={settings169}
				/>
				<MovieCarousel
					title='Romance'
					genre='Romance'
					aspect='aspect-[16/9]'
					settings={settings169}
				/>
			</section>
		</CineLayout>
	);
};
