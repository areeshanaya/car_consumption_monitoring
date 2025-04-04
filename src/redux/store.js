// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // Corrected import
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk)); // use the named 'thunk'

export default store;
