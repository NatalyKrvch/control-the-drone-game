import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface GameOverModalProps {
  gameStatus: 'won' | 'lost';
  onRestart: () => void;
}

const GameOverModal = ({ gameStatus, onRestart }: GameOverModalProps) => {
  let message = '';

  if (gameStatus === 'won') {
    message = 'Congratulations! You won!';
  } else {
    message = 'The drone has been destroyed.';
  }

  return (
    <Dialog open={true} onClose={onRestart}>
      <DialogTitle>Game Over</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{message}</Typography>
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
