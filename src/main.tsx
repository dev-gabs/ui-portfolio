import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

/* Central Design System & Global Styles */
import './styles/design-system.css';
import './styles/globals.css';
import './styles/animations.css';
import './styles/responsive.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
