import TextField from '@mui/material/TextField';
import { useRecoilState } from 'recoil';
import { scoreboradInfoAtom } from '../../store/atomScoreboard';
import { PlayerPort } from '../../types/scoreboardDefaultValue';
import { ChangeEventHandler } from 'react';

type Props = {
  port: PlayerPort;
};

export function InfoPlayerSolo({ port }: Props) {
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);

  const playerNameEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setScoreboradInfo((prev) => ({
      ...prev,
      [port]: {
        ...prev[port],
        name: event.target.value,
      },
    }));
  };

  return (
    <>
      <TextField
        id={`${port}-name`}
        label="Name"
        variant="outlined"
        size="small"
        value={scoreboradInfo[port].name}
        onChange={playerNameEdit}
        sx={{ width: 294 }}
      />
    </>
  );
}
