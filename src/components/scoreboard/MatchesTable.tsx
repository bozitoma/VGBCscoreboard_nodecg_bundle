import {
  Table,
  Box,
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Radio,
  Stack,
} from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { scoreboradInfoAtom, matchesAtom, matchesSelectedRowId } from '../../store/atomScoreboard';
import { ScoreboardStartggUrlInput } from './ScoreboardStartggUrlInput';

export const MatchesTable = () => {
  const matches = useRecoilValue(matchesAtom);
  const [selectedRowId, setSelectedRowId] = useRecoilState(matchesSelectedRowId);

  const setScoreboradInfo = useSetRecoilState(scoreboradInfoAtom);

  const handleRowClick = (match: matchArray) => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Round: match.Round,
      Player1: {
        ...prev.Player1,
        name: match.Player1.name,
        team: match.Player1.team,
        xID: match.Player1.xID,
        score: 0,
      },
      Player2: {
        ...prev.Player2,
        name: match.Player2.name,
        team: match.Player2.team,
        xID: match.Player2.xID,
        score: 0,
      },
    }));
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        <ScoreboardStartggUrlInput />
        <TableContainer sx={{ width: 800, maxHeight: 800 }} component={Paper}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>{/* ラジオボタン用のセル */}</TableCell>
                <TableCell>Round Text</TableCell>
                <TableCell>Player 1</TableCell>
                <TableCell>Player 2</TableCell>
                <TableCell>Stream</TableCell>
                <TableCell>State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches.map((match) => (
                <TableRow
                  key={match.Id}
                  hover
                  onClick={() => {
                    setSelectedRowId(match.Id);
                    handleRowClick(match);
                  }}
                >
                  <TableCell padding="checkbox">
                    <Radio checked={selectedRowId === match.Id} />
                  </TableCell>
                  <TableCell>{match.Round}</TableCell>
                  <TableCell>{match.Player1.name}</TableCell>
                  <TableCell>{match.Player2.name}</TableCell>
                  <TableCell>{match.Stream}</TableCell>
                  <TableCell>{match.State}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};
