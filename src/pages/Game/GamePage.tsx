import Cave from '@components/Cave/Cave';
import GameOverModal from '@components/GameOverModal/GameOverModal';
import SpeedGauges from '@components/SpeedGauges/SpeedGauges';
import { useGameContext } from '@contextsGameContext';
import { useDroneControls } from '@hooks/useDroneControls';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Game = () => {
  const { playerId, token } = useGameContext();
  const navigate = useNavigate();
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>(
    'playing',
  );
  const [score, setScore] = useState(0);

  const { dronePosition, horizontalSpeed, verticalSpeed } = useDroneControls(
    250,
    500,
    gameStatus,
  );

  useEffect(() => {
    if (!playerId || !token) {
      navigate('/');
    }
  }, [playerId, token, navigate]);

  return (
    <div>
      <h1>Drone Game</h1>
      <h2>Score: {score}</h2>
      <Cave
        dronePosition={dronePosition}
        verticalSpeed={verticalSpeed}
        setGameStatus={setGameStatus}
        gameStatus={gameStatus}
        setScore={setScore}
        score={score}
      />
      <SpeedGauges
        horizontalSpeed={horizontalSpeed}
        verticalSpeed={verticalSpeed}
      />
      {gameStatus !== 'playing' && (
        <GameOverModal
          gameStatus={gameStatus}
          onRestart={() => {
            navigate('/');
          }}
          score={score}
        />
      )}
    </div>
  );
};

export default Game;
