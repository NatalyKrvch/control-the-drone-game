import { useGameContext } from '@contexts/GameContext';
import { useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [complexity, setComplexity] = useState(0);
  const { initializeGame } = useGameContext();

  const handleStartGame = async () => {
    await initializeGame(name, complexity);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <input
        type="number"
        value={complexity}
        onChange={(e) => setComplexity(Number(e.target.value))}
        min="1"
        max="10"
      />
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default Form;
