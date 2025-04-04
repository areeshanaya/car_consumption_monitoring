// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

// Use ReactDOM.createRoot() for React 18 and later
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
