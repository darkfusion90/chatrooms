import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers'
import App from './components/App'
import ModalContainer from './components/modals/ModalContainer'
import ToastContainer from './components/toasts/ToastContainer/'

const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhanchers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <App />
        <ModalContainer />
        <ToastContainer />
    </Provider>,
    document.querySelector("#root")
);