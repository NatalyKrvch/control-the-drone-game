import { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import Scoreboard from '@components/Scoreboard/Scoreboard';
import { getStoredScores, GameScore } from 'utils/localStorageUtils';
import { useGameContext } from '@hooks/useGameContext';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [complexity, setComplexity] = useState(0);
  const [loading, setLoading] = useState(false);
  const { initializeGame } = useGameContext();
  const navigate = useNavigate();
  const [scores, setScores] = useState<GameScore[]>([]);

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

  useEffect(() => {
    const storedScores = getStoredScores();
    storedScores.sort((a, b) => b.score - a.score);
    setScores(storedScores);
  }, []);

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

      <Scoreboard scores={scores} />

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
