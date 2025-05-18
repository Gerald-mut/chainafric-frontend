
import './utils/polyfills.js'; // This must be the first import

import React from 'react'; 
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make sure we use the actual DOM node that exists
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found!");
}

// Create root with React 18 API
const root = createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
