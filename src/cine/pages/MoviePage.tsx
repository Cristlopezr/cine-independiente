import { useParams } from 'react-router-dom';
import { CineLayout } from '../layout';

export const MoviePage = () => {
	const { id } = useParams();
	return (
		<CineLayout>
			<div>
				<p>{id}</p>
			</div>
		</CineLayout>
	);
};
