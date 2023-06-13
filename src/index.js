import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from './component/store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthContextProvider><BrowserRouter><App /></BrowserRouter></AuthContextProvider>)
