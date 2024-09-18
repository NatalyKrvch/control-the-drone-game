import Cave from '@components/Cave/Cave';
import GameOverModal from 'pages/Game/components/GameOverModal/GameOverModal';
import SpeedGauges from '@components/SpeedGauges/SpeedGauges';
import { CircularProgress, Box, Typography } from '@mui/material';
import GameInstructions from '@components/GameInstructions/GameInstructions';
import { GameStatus } from 'constants';
import useGamePage from './components/useGamePage';

const GamePage = () => {
  const {
    gameStatus,
    setGameStatus,
    score,
    setScore,
    loading,
    dronePosition,
    horizontalSpeed,
    verticalSpeed,
    navigate,
  } = useGamePage();

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
          {gameStatus !== GameStatus.Playing && (
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
