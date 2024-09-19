import { GameStatus } from 'constants';

const useGameOverModal = (gameStatus: GameStatus) => {
  let message = '';

  if (gameStatus === GameStatus.Won) {
    message = 'Congratulations! You won!';
  } else {
    message = 'The drone has been destroyed.';
  }

  return message;
};

export default useGameOverModal;
