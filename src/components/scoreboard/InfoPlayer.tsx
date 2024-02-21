import { Button, Stack } from '@mui/material';
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded';
import { useRecoilState } from 'recoil';
import { scoreboradInfoAtom } from '../../store/atomScoreboard';
import { InfoPlayerUnit } from './InfoPlayerUnit';

export function InfoPlayer() {
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
      },
      Player2: {
        ...prev.Player2,
        name: scoreboradInfo.Player1.name,
        team: scoreboradInfo.Player1.team,
        xID: scoreboradInfo.Player1.xID,
        port: scoreboradInfo.Player1.port,
      },
    }));
  };

  return (
    <Stack direction="row" spacing={1}>
      <Stack spacing={1}>
        <InfoPlayerUnit port="Player1" />
      </Stack>
      <Button variant="text" onClick={playerNameSwap}>
        <SwapHorizontalCircleRoundedIcon />
      </Button>
      <Stack spacing={1}>
        <InfoPlayerUnit port="Player2" />
      </Stack>
    </Stack>
  );
}
