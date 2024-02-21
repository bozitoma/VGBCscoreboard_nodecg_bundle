import TextField from '@mui/material/TextField';
import { useRecoilState } from 'recoil';
import { scoreboradInfoAtom } from '../../store/atomScoreboard';
import { PlayerPort } from '../../types/scoreboardDefaultValue';
import { ChangeEventHandler } from 'react';

type Props = {
  port: PlayerPort;
};

export function InfoIDSolo({ port }: Props) {
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);

  const playerIDEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setScoreboradInfo((prev) => ({
      ...prev,
      [port]: {
        ...prev[port],
        xID: event.target.value,
      },
    }));
  };

  return (
    <>
      <TextField
        id={`${port}-ID`}
        label="@ID"
        variant="outlined"
        size="small"
        value={scoreboradInfo[port].xID}
        onChange={playerIDEdit}
        sx={{ width: 145 }}
      />
    </>
  );
}
