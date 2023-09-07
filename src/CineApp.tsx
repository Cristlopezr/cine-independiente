import './App.css';
import { ThemeProvider } from './components';
import { AppRouter } from './router';

export const CineApp = () => {
	return (
		<ThemeProvider>
			<AppRouter />
		</ThemeProvider>
	);
};
