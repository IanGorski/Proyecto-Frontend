import React from '../frontend/node_modules/react';
import { BrowserRouter } from '../frontend/node_modules/react-router';
import AuthContextProvider from '../frontend/src/Context/AuthContext.tsx';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);