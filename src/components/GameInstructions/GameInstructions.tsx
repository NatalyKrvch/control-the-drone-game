const GameInstructions = () => {
  return (
    <div style={{ padding: '10px', maxWidth: '300px' }}>
      <h3>Controls</h3>
      <p>
        Use the <strong>Arrow Down</strong> key to start.
      </p>
      <ul>
        <li>
          <strong>Arrow Up:</strong> Decrease speed
        </li>
        <li>
          <strong>Arrow Down:</strong> Increase speed
        </li>
        <li>
          <strong>Arrow Left:</strong> Move left
        </li>
        <li>
          <strong>Arrow Right:</strong> Move right
        </li>
      </ul>
    </div>
  );
};

export default GameInstructions;
