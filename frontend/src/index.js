import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorkerRegistration';
import './index.css';
import App from './App';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.register();
