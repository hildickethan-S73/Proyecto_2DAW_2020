import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { promiseMiddleware } from './middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getMiddleware = () => {
    return applyMiddleware(promiseMiddleware)
}

const store = createStore(reducers, composeEnhancers(getMiddleware()));

export default store;