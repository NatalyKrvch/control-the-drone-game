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
  const [collisionType, setCollisionType] = useState<
    'nose' | 'back' | 'side' | null
  >(null);

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
      <Cave
        dronePosition={dronePosition}
        verticalSpeed={verticalSpeed}
        setGameStatus={setGameStatus}
        gameStatus={gameStatus}
        setCollisionType={setCollisionType}
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
        />
      )}
    </div>
  );
};

export default Game;
