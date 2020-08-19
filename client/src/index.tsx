import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store'
import App from './components/App'
import ModalContainer from './components/modals/ModalContainer'
import ToastContainer from './components/toasts/ToastContainer'


ReactDOM.render(
    <Provider store={store}>
        <App />
        <ModalContainer />
        <ToastContainer />
    </Provider>,
    document.querySelector("#root")
);