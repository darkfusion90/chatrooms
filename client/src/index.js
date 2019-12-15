import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers/'
import NotificationProvider from './providers/NotificationProvider';

const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhanchers(
    applyMiddleware(thunk)
));


ReactDOM.render(
    <Provider store={store}>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </Provider>,
    document.querySelector("#root")
);