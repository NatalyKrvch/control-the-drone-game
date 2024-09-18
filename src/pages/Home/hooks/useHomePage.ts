import { useGameContext } from 'hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GameScore } from 'types';
import { getStoredScores } from 'utils';

const useHomePage = () => {
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

  return {
    open,
    setOpen,
    name,
    setName,
    complexity,
    setComplexity,
    loading,
    handleStartGame,
    scores,
  };
};

export default useHomePage;
