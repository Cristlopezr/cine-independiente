import { Link } from 'react-router-dom';

export const SelectAuth = ({ title, href, linkText }: { title: string; href: string; linkText: string }) => {
	return (
		<div className='relative flex justify-center text-sm'>
			<span className='bg-background px-2 text-muted-foreground'>{title}</span>
			<Link to={href}>{linkText}</Link>
		</div>
	);
};
