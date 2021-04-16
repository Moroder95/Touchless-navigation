import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TouchlessApp } from 'touchless-navigation';
import 'touchless-navigation/dist/index.css';

ReactDOM.render(
  <TouchlessApp phoneCursorController={true}>
    <App />
  </TouchlessApp>,
  document.getElementById('root')
);
