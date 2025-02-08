import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import FAQ from './pages/FAQ.tsx';
import { Routes, Route, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);