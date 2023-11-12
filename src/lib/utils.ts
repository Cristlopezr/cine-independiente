import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const gradientStyle = {
	backgroundImage: `linear-gradient(
	  hsla(224, 71.4%, 4.1%, 0) 0%, hsla(224, 71.4%, 4.1%, 0) 49.02%, 
	  hsla(224, 71.4%, 4.1%, 0.009) 52.42%, hsla(224, 71.4%, 4.1%, 0.036) 55.82%, 
	  hsla(224, 71.4%, 4.1%, 0.082) 59.22%, hsla(224, 71.4%, 4.1%, 0.15) 62.62%, 
	  hsla(224, 71.4%, 4.1%, 0.23) 66.02%, hsla(224, 71.4%, 4.1%, 0.332) 69.41%, 
	  hsla(224, 71.4%, 4.1%, 0.443) 72.81%, hsla(224, 71.4%, 4.1%, 0.557) 76.21%, 
	  hsla(224, 71.4%, 4.1%, 0.668) 79.61%, hsla(224, 71.4%, 4.1%, 0.77) 83.01%, 
	  hsla(224, 71.4%, 4.1%, 0.85) 86.41%, hsla(224, 71.4%, 4.1%, 0.918) 89.8%, 
	  hsla(224, 71.4%, 4.1%, 0.964) 93.2%, hsla(224, 71.4%, 4.1%, 0.991) 96.6%, 
	  hsla(224, 71.4%, 4.1%, 0) 100%)`,
};
