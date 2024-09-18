import React from 'react';
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
import Scoreboard from '@components/Scoreboard/Scoreboard';
import useHomePage from './hooks/useHomePage';

const HomePage = () => {
  const {
    open,
    setOpen,
    name,
    setName,
    complexity,
    setComplexity,
    loading,
    handleStartGame,
    scores,
  } = useHomePage();

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
