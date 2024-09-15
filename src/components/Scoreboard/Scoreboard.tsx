import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface Score {
  name: string;
  score: number;
  complexity: number;
}

interface ScoreboardProps {
  scores: Score[];
}

const Scoreboard = ({ scores }: ScoreboardProps) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Scoreboard
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Player Name</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Complexity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.score}</TableCell>
              <TableCell>{row.complexity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Scoreboard;
