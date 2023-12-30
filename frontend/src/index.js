import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BusinessesContextProvider } from './context/BusinessContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BusinessesContextProvider>
        <App />
      </BusinessesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
