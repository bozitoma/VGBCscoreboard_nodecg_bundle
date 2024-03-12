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

const fullRoundTextShorts: { [key: string]: string } = {
  'Grand Final Reset': 'Grand Final',
  'Grand Final': 'Grand Final',
  'Winners Final': 'Winners Final',
  'Winners Semi-Final': 'Winners Semi',
  'Winners Quarter-Final': 'Winners Quarter',
  'Losers Final': 'Losers Final',
  'Losers Semi-Final': 'Losers Semi',
  'Losers Quarter-Final': 'Losers Quarter',
};

export const MatchesTable = () => {
  const matches = useRecoilValue(matchesAtom);
  const [selectedRowId, setSelectedRowId] = useRecoilState(matchesSelectedRowId);

  const setScoreboradInfo = useSetRecoilState(scoreboradInfoAtom);

  const getRoundText = (set: matchArray) => {
    const lookupResult = fullRoundTextShorts[set?.Round || ''];

    if (lookupResult) {
      return lookupResult;
    }

    const fullRoundText = set?.Round;
    if (!fullRoundText) {
      return '';
    }

    if (set?.lPlacement) {
      if (fullRoundText.startsWith('Winners')) {
        return `Winners Top${(set.lPlacement - 1) * 2}`;
      } else if (fullRoundText.startsWith('Losers')) {
        return `Losers Top${(set.wPlacement - 1) * 2}`;
      }
    }

    return fullRoundText;
  };

  const handleRowClick = (match: matchArray) => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Round: getRoundText(match),
      Player1: {
        ...prev.Player1,
        name: match.Player1.name,
        team: match.Player1.team,
        xID: match.Player1.xID,
      },
      Player2: {
        ...prev.Player2,
        name: match.Player2.name,
        team: match.Player2.team,
        xID: match.Player2.xID,
      },
      Player3: {
        ...prev.Player3,
        name: match.Player3.name,
        team: match.Player3.team,
        xID: match.Player3.xID,
      },
      Player4: {
        ...prev.Player4,
        name: match.Player4.name,
        team: match.Player4.team,
        xID: match.Player4.xID,
      },
      Score: {
        Player1: 0,
        Player2: 0,
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
                  <TableCell>{getRoundText(match)}</TableCell>
                  <TableCell>
                    {match.Player3.name === ''
                      ? match.Player1.name
                      : match.Player1.name + ' / ' + match.Player3.name}
                  </TableCell>
                  <TableCell>
                    {match.Player4.name === ''
                      ? match.Player2.name
                      : match.Player2.name + ' / ' + match.Player4.name}
                  </TableCell>
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
