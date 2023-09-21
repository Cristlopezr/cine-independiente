import { useState } from 'react';

export const CustomTooltip = ({ children }: { children: React.ReactNode }) => {
	const [show, setShow] = useState(false);

	return (
		<div className='relative'>
			<div
				onMouseEnter={() => setShow(true)}
				onMouseLeave={() => setShow(false)}
				onMouseDown={() => setShow(false)}
			>
				{children}
			</div>
			<p
				className={`${!show ? 'opacity-0' : 'opacity-100'} ${
					!show ? '-top-8' : '-top-9'
				} pointer-events-none absolute transition-all duration-100 delay-150 text-xs font-semibold px-3 py-1.5 rounded-md left-1/2 -translate-x-1/2 bg-primary text-primary-foreground z-30`}
			>
				Cerrar
			</p>
		</div>
	);
};
