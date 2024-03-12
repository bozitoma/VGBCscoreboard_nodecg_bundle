import { Button, Stack } from '@mui/material';
import { useRecoilState } from 'recoil';
import { scoreboradInfoAtom } from '../../../store/atomScoreboard';
import { InfoPlayerUnitMelee } from './InfoPlayerUnitMelee';

// MUI icon
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded';
import SwapVertIcon from '@mui/icons-material/SwapVert';

export function InfoPlayerMelee() {
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);

  const playerNameSwap = () => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Player1: {
        ...prev.Player1,
        name: scoreboradInfo.Player2.name,
        team: scoreboradInfo.Player2.team,
        xID: scoreboradInfo.Player2.xID,
        port: scoreboradInfo.Player2.port,
        character: scoreboradInfo.Player2.character,
      },
      Player2: {
        ...prev.Player2,
        name: scoreboradInfo.Player1.name,
        team: scoreboradInfo.Player1.team,
        xID: scoreboradInfo.Player1.xID,
        port: scoreboradInfo.Player1.port,
        character: scoreboradInfo.Player1.character,
      },
      Player3: {
        ...prev.Player3,
        name: scoreboradInfo.Player4.name,
        team: scoreboradInfo.Player4.team,
        xID: scoreboradInfo.Player4.xID,
        port: scoreboradInfo.Player4.port,
        character: scoreboradInfo.Player4.character,
      },
      Player4: {
        ...prev.Player4,
        name: scoreboradInfo.Player3.name,
        team: scoreboradInfo.Player3.team,
        xID: scoreboradInfo.Player3.xID,
        port: scoreboradInfo.Player3.port,
        character: scoreboradInfo.Player3.character,
      },
    }));
  };

  const teamA_Swap = () => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Player1: {
        ...prev.Player3,
        name: scoreboradInfo.Player3.name,
        team: scoreboradInfo.Player3.team,
        xID: scoreboradInfo.Player3.xID,
        port: scoreboradInfo.Player3.port,
        character: scoreboradInfo.Player3.character,
      },
      Player3: {
        ...prev.Player1,
        name: scoreboradInfo.Player1.name,
        team: scoreboradInfo.Player1.team,
        xID: scoreboradInfo.Player1.xID,
        port: scoreboradInfo.Player1.port,
        character: scoreboradInfo.Player1.character,
      },
    }));
  };

  const teamB_Swap = () => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Player2: {
        ...prev.Player4,
        name: scoreboradInfo.Player4.name,
        team: scoreboradInfo.Player4.team,
        xID: scoreboradInfo.Player4.xID,
        port: scoreboradInfo.Player4.port,
        character: scoreboradInfo.Player4.character,
      },
      Player4: {
        ...prev.Player2,
        name: scoreboradInfo.Player2.name,
        team: scoreboradInfo.Player2.team,
        xID: scoreboradInfo.Player2.xID,
        port: scoreboradInfo.Player2.port,
        character: scoreboradInfo.Player2.character,
      },
    }));
  };

  return (
    <Stack direction="row" spacing={1}>
      <Stack spacing={1}>
        <InfoPlayerUnitMelee port="Player1" />
        <Button variant="outlined" onClick={teamA_Swap}>
          <SwapVertIcon />
        </Button>
        <InfoPlayerUnitMelee port="Player3" />
      </Stack>
      <Button variant="text" onClick={playerNameSwap}>
        <SwapHorizontalCircleRoundedIcon />
      </Button>
      <Stack spacing={1}>
        <InfoPlayerUnitMelee port="Player2" />
        <Button variant="outlined" onClick={teamB_Swap}>
          <SwapVertIcon />
        </Button>
        <InfoPlayerUnitMelee port="Player4" />
      </Stack>
    </Stack>
  );
}
