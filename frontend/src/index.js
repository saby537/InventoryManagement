import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorkerRegistration';
import './index.css';
import App from './App';
import '../node_modules/react-bootstrap/dist/bootstrap.css';

ReactDOM.render(
	<BrowserRouter>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.register();
