import {applyMiddleware, createStore} from "redux";

import reducer from "./Reducers"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

console.log("in store: " + process.env.NODE_ENV);
const isProductionMode = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

const activeMiddleware = [thunk, promise(), logger()];

/*if(!isProductionMode){
	activeMiddleware.push(logger());
	activeMiddleware.push(window.devToolsExtension && window.devToolsExtension());
}*/

const middleware = applyMiddleware(...activeMiddleware);

export default createStore(reducer, middleware);
