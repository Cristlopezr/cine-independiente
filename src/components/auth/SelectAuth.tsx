import { Link } from 'react-router-dom';

export const SelectAuth = ({ title, href, linkText }: { title: string; href: string; linkText: string }) => {
	return (
		<div className='relative flex justify-center gap-2 text-sm md:text-base mt-5'>
			<span className='bg-background text-muted-foreground'>{title}</span>
			<Link to={href}>{linkText}</Link>
		</div>
	);
};
