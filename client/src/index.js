import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <BrowserRouter>
      <Auth0Provider
        domain="dev-a5lp6h1utxb70h27.us.auth0.com"
        clientId="e5AQtF7CgeLfwT5EE2hEcf2HgP0GghqH"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "pokemon identifier",
          scope: "openid profile email"
        }}

      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
