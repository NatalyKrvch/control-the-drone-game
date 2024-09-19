import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { GameProvider } from './context/GameContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <GameProvider>
      <BrowserRouter basename="verbose-octo-enigma/">
        <App />
      </BrowserRouter>
    </GameProvider>
  </React.StrictMode>,
);
