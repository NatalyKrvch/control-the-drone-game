import Cave from '@components/Cave/Cave';
import GameOverModal from '@components/GameOverModal/GameOverModal';
import SpeedGauges from '@components/SpeedGauges/SpeedGauges';
import { useDroneControls } from '@hooks/useDroneControls';
import { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { saveGameScore } from 'utils/localStorageUtils';
import GameInstructions from '@components/GameInstructions/GameInstructions';
import { useGameContext } from '@hooks/useGameContext';

const GamePage = () => {
  const { playerId, token, playerName, playerComplexity, caveData } =
    useGameContext();
  const navigate = useNavigate();
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>(
    'playing',
  );
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (gameStatus === 'won') {
      saveGameScore({
        name: playerName,
        complexity: playerComplexity,
        score,
      });
    }
  }, [gameStatus, playerName, playerComplexity, score]);

  const segmentHeight = 10;
  const viewHeight = 600;
  const minSegments = Math.ceil(viewHeight / segmentHeight);

  useEffect(() => {
    if (caveData.length >= minSegments) {
      setLoading(false);
    }
  }, [caveData, minSegments]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      position="relative"
    >
      <Box position="absolute" top={20} right={20} p={2} borderRadius="8px">
        <Typography variant="h5">Score:</Typography>
        <Typography variant="h4" color="primary">
          {score}
        </Typography>
      </Box>
      <Box position="absolute" top={0} left={20} p={2} borderRadius="8px">
        <GameInstructions />
      </Box>

      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <>
          <Box mb={2}>
            <SpeedGauges
              horizontalSpeed={horizontalSpeed}
              verticalSpeed={verticalSpeed}
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Cave
              dronePosition={dronePosition}
              verticalSpeed={verticalSpeed}
              setGameStatus={setGameStatus}
              gameStatus={gameStatus}
              setScore={setScore}
              score={score}
            />
          </Box>
          {gameStatus !== 'playing' && (
            <GameOverModal
              gameStatus={gameStatus}
              onRestart={() => {
                navigate('/');
              }}
              score={score}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default GamePage;
