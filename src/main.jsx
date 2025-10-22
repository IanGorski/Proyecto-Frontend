import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from "./Context/AuthContext";
import { createRoot } from 'react-dom/client';
import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);