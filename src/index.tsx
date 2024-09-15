import Game from '@processes/Game/Game';
import { GameProvider } from 'contexts/GameContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <GameProvider>
      <Game />
      <ToastContainer />
    </GameProvider>
  </React.StrictMode>,
);
