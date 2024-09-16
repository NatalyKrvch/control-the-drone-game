import GamePage from 'pages/Game/GamePage';
import HomePage from 'pages/Home/HomePage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
};

export default App;
