import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { IdentityKit, IdentityKitAuthType, NFIDW, InternetIdentity } from "@nfid/identitykit";
import "@nfid/identitykit/react/styles.css";
import { AuthProvider } from './StateManagement/useContext/useClient';

const signers = [NFIDW, InternetIdentity];
const canisterID = import.meta.env.CANISTER_ID_FITNFRAME_BACKEND;

ReactDOM.createRoot(document.getElementById('root')).render(
  <IdentityKit
    signers={signers}
    authType={IdentityKitAuthType.DELEGATION}
    signerClientOptions={{
      targets: [canisterID],
      retryTimes: 2
    }}
  >
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </IdentityKit>
);
