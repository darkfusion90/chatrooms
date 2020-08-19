import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const enhancers = compose(applyMiddleware(thunk))

export default createStore(reducers, enhancers)
