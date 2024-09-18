import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { GameOverModalProps } from 'types';
import useGameOverModal from './hooks/useGameOverModal';

const GameOverModal = ({
  gameStatus,
  onRestart,
  score,
}: GameOverModalProps) => {
  const message = useGameOverModal(gameStatus);

  return (
    <Dialog open={true} onClose={onRestart}>
      <DialogTitle>Game Over</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{message}</Typography>
        <Typography variant="h6">Your Score: {score}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRestart} color="primary" variant="contained">
          Back to Scoreboard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOverModal;
