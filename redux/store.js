import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import promiseMid from "./middleware/promiseMid";
import combineReducer from './reducers';

export const initStore = (initialState = {}) => (
  createStore(
    combineReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMid)),
  )
);
