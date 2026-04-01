import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducers from './reducers';


const composedEnhancer = composeWithDevTools(applyMiddleware(thunk, logger))

const store = createStore(
    rootReducers, 
    composedEnhancer
);


export default store;