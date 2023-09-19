import { useSearchParams } from 'react-router-dom';
import Modal from 'react-modal';
import { Button } from '@/components/ui';
import { UploadMovieForm } from '@/components/cine/user/myMoviesPage';

Modal.setAppElement('#root');

const params = {
	upload: {
		name: 'upload',
		initialState: 'open',
	},
};

export const MyMoviesPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const onCloseModal = () => {
		const uploadParam = searchParams.get(params.upload.name);
		if (uploadParam) {
			searchParams.delete(params.upload.name);
		}

		setSearchParams(searchParams);
	};

	const onOpenModal = () => {
		setSearchParams({ upload: params.upload.initialState });
	};

	return (
		<>
			<h1>Mis películas</h1>
			<Button onClick={onOpenModal}>Subir</Button>
			<Modal
				isOpen={searchParams.get(params.upload.name) === params.upload.initialState}
				className='rounded-lg text-accent-foreground w-4/5 max-w-[960px] max-h-[800px] overflow-auto'
				overlayClassName='modal-background'
				closeTimeoutMS={200}
			>
				<UploadMovieForm onCloseModal={onCloseModal} />
			</Modal>
		</>
	);
};
