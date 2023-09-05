import './App.css';
import { Button } from './components/ui';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { increment } from './store/auth';

function App() {
	const count = useAppSelector(state => state.auth.value);
	const dispatch = useAppDispatch();
	return (
		<div className='text-3xl'>
			<Button onClick={() => dispatch(increment())}>Increment</Button>
			<h1>Hello World</h1>
			<h2>{count}</h2>
		</div>
	);
}

export default App;