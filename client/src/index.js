import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'
import { UserProvider } from './UserContext';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId =process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

   
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
      >
         <UserProvider>
        <App />
        </UserProvider>
      </Auth0Provider>
    

);
