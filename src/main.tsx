
import React from 'react'; // Import React explicitly
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create root with React 18 API
const root = createRoot(document.getElementById("root")!);
// Wrap App in React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
