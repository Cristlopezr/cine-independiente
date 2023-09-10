import ReactDOM from 'react-dom/client';
import { CineApp } from './CineApp.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<CineApp />
		</BrowserRouter>
	</Provider>
);
