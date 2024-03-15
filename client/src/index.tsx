import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './App/store';

import App from './App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>

        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);