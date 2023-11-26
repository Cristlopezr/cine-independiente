import type { MovieState } from '@/cine/pages';
import { Avatar, AvatarFallback, AvatarImage, Button, Input } from '@/components/ui';
import { UserWatchParty } from '@/interfaces';
import { Ref, useEffect, useRef } from 'react';

type Message = {
	msg: string;
	user: UserWatchParty;
	time: string;
	message_id: string;
};

type ChatProps = {
	messages: Message[];
	user: UserWatchParty;
	onSubmitMessage: (e: React.FormEvent<HTMLFormElement>) => void;
	inputRef: Ref<HTMLInputElement> | null;
	setIsChatOpen: (state: boolean) => void;
	movieState: MovieState;
	isChatOpen: boolean;
};

export const Chat = ({
	messages,
	user,
	onSubmitMessage,
	inputRef,
	setIsChatOpen,
	movieState,
	isChatOpen,
}: ChatProps) => {
	const chatContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// Cuando se actualizan los mensajes, desplázate hacia abajo para mostrar el último mensaje.
		if (chatContainerRef.current) {
			const lastMessage = chatContainerRef.current.lastChild as HTMLElement;
			if (lastMessage) {
				lastMessage.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}, [messages, isChatOpen]);

	return (
		<div
			className={`flex relative flex-col justify-between gap-5 p-5 ${
				movieState === 'started' ? 'max-h-screen h-screen' : 'h-[600px]'
			}`}
		>
			{movieState === 'started' ? (
				<Button size='sm' className='absolute right-5' onClick={() => setIsChatOpen(false)}>
					Cerrar chat
				</Button>
			) : null}
			<div ref={chatContainerRef} className='flex flex-col gap-5 mt-12 h-full overflow-y-auto'>
				{messages?.map(message => (
					<div key={message.message_id} className='flex items-center gap-3'>
						<Avatar className='w-8 h-8 border-2 border-border-second'>
							<AvatarImage src={message.user.avatarUrl ? message.user.avatarUrl : undefined} />
							<AvatarFallback className='text-sm'>
								{message.user.name.slice(0, 1)}
							</AvatarFallback>
						</Avatar>
						<div className='text-xs flex flex-col gap-[1px]'>
							<div className='font-semibold text-sm'>
								{message.user.user_id === user.user_id
									? 'Tú'
									: `${message.user.name} ${message.user.lastname}`}
								<span className='text-white/50 text-xs ml-2'>{message.time}</span>
							</div>
							<div>{message.msg}</div>
						</div>
					</div>
				))}
			</div>
			<form onSubmit={onSubmitMessage} className='flex justify-between gap-3 items-center'>
				<Input placeholder='Escribe un mensaje' ref={inputRef} />
				<Button type='submit'>Enviar</Button>
			</form>
		</div>
	);
};
