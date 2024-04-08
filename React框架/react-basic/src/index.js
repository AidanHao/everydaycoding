import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
// render相当于mount
root.render(
  // StrictMode 严格模式
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
