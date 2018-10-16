import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { httpData } from './reducer';

export const history = createHistory();

const router_mw = routerMiddleware(history);

const middleware = process.env.NODE_ENV === 'development' ? [ thunk, router_mw, logger ] : [ thunk, router_mw ];

export const configureStore = (initState = {}) =>
	createStore(combineReducers({ httpData, router: routerReducer }), initState, applyMiddleware(...middleware));
export default configureStore();
