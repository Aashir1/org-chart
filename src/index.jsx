import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';


import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

// axios.defaults.baseURL = 'http://masterdata-microservice-jk-microservices-test.jazzcash-fra04-b3c-32x128-32e4d82b5ac35ba812aabbeece8661d9-0000.eu-de.containers.appdomain.cloud';
// axios.defaults.baseURL = 'https://gw.icp-proxy.jazzcash-fra04-b3c-32x128-32e4d82b5ac35ba812aabbeece8661d9-0000.eu-de.containers.appdomain.cloud/jazzcashtestorg/sandbox';
const { store } = {};

ReactDOM.render(
	// <Provider store={store}>
	<App />
	// </Provider>
	,
	document.getElementById('root') || document.createElement('div')
);
export default store;