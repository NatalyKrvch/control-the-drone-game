import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Slider,
  CircularProgress,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from 'context/GameContext';
import { toast } from 'react-toastify';
import Scoreboard from '@components/Scoreboard/Scoreboard';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [complexity, setComplexity] = useState(0);
  const [loading, setLoading] = useState(false);
  const { initializeGame } = useGameContext();
  const navigate = useNavigate();

  const handleStartGame = async () => {
    if (!name) {
      toast.error('Please enter your name');
      return;
    }

    setLoading(true);
    try {
      await initializeGame(name, complexity);
      setOpen(false);
      navigate('/game');
    } catch (error) {
      console.error('Error initializing game:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockScores = [
    { name: 'Player1', score: 100, complexity: 5 },
    { name: 'Player2', score: 80, complexity: 3 },
    { name: 'Player3', score: 120, complexity: 7 },
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Drone Game
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpen(true)}
        style={{ display: 'block', margin: '20px auto' }}
      >
        Let's play
      </Button>

      <Scoreboard scores={mockScores} />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Start New Game</DialogTitle>
        <DialogContent>
          <TextField
            label="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography gutterBottom>Complexity: {complexity}</Typography>
          <Slider
            value={complexity}
            onChange={(e, newValue) => setComplexity(newValue as number)}
            aria-labelledby="complexity-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
          />
          <Button
            variant="contained"
            onClick={handleStartGame}
            disabled={loading}
            fullWidth
            style={{ marginTop: '16px' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Go!'}
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default HomePage;
