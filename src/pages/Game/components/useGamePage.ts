import {
  CAVE_SEGMENT_HEIGHT,
  DRONE_INITIAL_X_POSITION,
  GameStatus,
  MAX_FIELD_HEIGHT,
  MAX_FIELD_WIDTH,
} from 'constants';

import { useDroneControls, useGameContext } from 'hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveGameScore } from 'utils';

const useGamePage = () => {
  const { playerId, token, playerName, playerComplexity, caveData } =
    useGameContext();
  const navigate = useNavigate();
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { dronePosition, horizontalSpeed, verticalSpeed } = useDroneControls(
    DRONE_INITIAL_X_POSITION,
    MAX_FIELD_WIDTH,
    gameStatus,
  );

  const minSegments = Math.ceil(MAX_FIELD_HEIGHT / CAVE_SEGMENT_HEIGHT);
  const isPlayerDataMissing = !playerId || !token;
  const isGameWon = gameStatus === GameStatus.Won;
  const hasEnoughSegments = caveData.length >= minSegments;

  useEffect(() => {
    if (isPlayerDataMissing) {
      navigate('/');
    }
  }, [isPlayerDataMissing, navigate]);

  useEffect(() => {
    if (isGameWon) {
      saveGameScore({
        name: playerName,
        complexity: playerComplexity,
        score,
      });
    }
  }, [isGameWon, playerName, playerComplexity, score]);

  useEffect(() => {
    if (hasEnoughSegments) {
      setLoading(false);
    }
  }, [hasEnoughSegments]);

  return {
    gameStatus,
    setGameStatus,
    score,
    setScore,
    loading,
    dronePosition,
    horizontalSpeed,
    verticalSpeed,
    navigate,
  };
};

export default useGamePage;
