import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

import './index.css';
import 'element-theme-default';
import registerServiceWorker from './registerServiceWorker';
// import configureStore from './store/configureStore';

// const store = configureStore();
// <Provider store={store}>

ReactDOM.render(
    <Provider>
        <HashRouter basename="/">
            <App />
        </HashRouter>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
