import { Box, Stack } from '@mui/material';
import { InfoTournamentName } from './InfoTournamentName';
import { InfoRound } from './InfoRound';
import { InfoBestof } from './InfoBestof';
import { InfoPlayer } from './InfoPlayer';
import { ScoreCounter } from './ScoreCounter';
import { ScoreboardButtons } from './ScoreboardButtons';
import { useStyled } from '../../hooks/useStyled';
import { TitleDivider } from '../general/TitleDivider';
import { InfoMessage } from './InfoMessage';

export const ScoreboardEditor = () => {
  const { Heading } = useStyled();

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
      }}
    >
      <Stack spacing={2} justifyContent="center">
        <Heading>Scoreboard Editor</Heading>
        <TitleDivider text="Information" />
        <InfoMessage />
        <Stack spacing={2} direction="row">
          <InfoTournamentName />
          <InfoRound />
          <InfoBestof />
        </Stack>
        <InfoPlayer />
        <ScoreCounter />
        <ScoreboardButtons />
      </Stack>
    </Box>
  );
};
