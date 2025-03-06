import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap our App with the Provider component, pass the store as prop
root.render(<Provider store={store}><App /></Provider>);
