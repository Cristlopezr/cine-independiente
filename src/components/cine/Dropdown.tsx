import { useAuthStore } from '@/hooks';
import React from 'react';
import { useState, useMemo } from 'react';
import { BsPersonCircle } from 'react-icons/bs';

export const Dropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, startLogout } = useAuthStore();

	const items = useMemo(
		() => [
			{
				name: 'Item 1',
				onClick: () => console.log('Clicked item 1'),
			},
			{
				name: 'Item 2',
				onClick: () => console.log('Clicked item 1'),
			},
			{
				name: 'Item 3',
				onClick: () => console.log('Clicked item 1'),
			},
			{
				name: 'Cerrar sesión',
				onClick: () => startLogout(),
			},
		],
		[]
	);

	return (
		<div className='relative' onMouseLeave={() => setIsOpen(false)}>
			<div
				className='flex items-center gap-2 hover:cursor-pointer'
				onMouseEnter={() => setIsOpen(true)}
			>
				<BsPersonCircle className='text-2xl h-12' />
				{/* <div className='bg-transparent w-10 h-12 flex place-content-center items-center rounded-full'>
							<div className='bg-primary h-7 w-7 flex place-content-center items-center rounded-full'>
								<div className='h-6 w-6 bg-secondary text-primary rounded-full text-center font-semibold uppercase'>
									{user.name.slice(0, 1)}
								</div>
							</div>
						</div> */}
				<p className='hidden md:block'>{user.name}</p>
			</div>
			<ul
				className={`p-1 gap-1 border hover:cursor-pointer flex flex-col rounded-sm absolute transition-all duration-300 ease-in-out ${
					!isOpen ? 'opacity-0' : 'opacity-100'
				}   text-base min-w-max top-12 -right-2 md:right-1/2 md:translate-x-1/2`}
			>
				{items.map((item, i) => {
					if (i !== items.length - 1) {
						return (
							<li
								key={item.name}
								className='p-3 rounded-sm hover:bg-accent'
								onClick={item.onClick}
							>
								{item.name}
							</li>
						);
					}
					return (
						<React.Fragment key={item.name}>
							<hr />
							<li className='p-3 rounded-sm hover:bg-accent' onClick={item.onClick}>
								{item.name}
							</li>
						</React.Fragment>
					);
				})}
			</ul>
		</div>
	);
};
