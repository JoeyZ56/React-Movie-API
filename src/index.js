import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App';

const rootElement = document.getElementById('root');
const root = createRoot(document.getElementById('app'));

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
