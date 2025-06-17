import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import "@nfid/identitykit/react/styles.css"; // NFID UI styles

import { IdentityKitProvider } from "@nfid/identitykit/react"; // ✅ THIS IS IMPORTANT
import { AuthProvider } from './StateManagement/useContext/useClient';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <IdentityKitProvider> {/* ✅ Add this wrapper */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </IdentityKitProvider>
  </React.StrictMode>
);
