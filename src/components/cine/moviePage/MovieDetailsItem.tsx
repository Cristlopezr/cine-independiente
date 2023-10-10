import { Cast, Director, Writer } from '@/interfaces';

interface MovieDetailsItemProps {
	data: Cast[] | Director[] | Writer[];
	text: string;
}

export const MovieDetailsItem = ({ data, text }: MovieDetailsItemProps) => {
	return (
		<div>
			<p className='font-semibold text-xl'>{text}</p>
			<ul className='flex flex-col gap-1'>
				{data.map(({ name }) => (
					<li>{name}</li>
				))}
			</ul>
		</div>
	);
};
