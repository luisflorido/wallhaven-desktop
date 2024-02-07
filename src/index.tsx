import { createRoot } from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';
import App from './App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
