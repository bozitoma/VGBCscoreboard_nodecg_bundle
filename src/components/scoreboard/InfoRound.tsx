import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import { scoreboradInfoAtom } from '../../store/atomScoreboard';

export function InfoRound() {
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);

  const roundEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Round: event.target.value,
    }));
  };

  return (
    <Stack spacing={2}>
      <TextField
        id="InfoRound"
        label="Round"
        variant="outlined"
        sx={{ width: 200 }}
        size="small"
        onChange={roundEdit}
        value={scoreboradInfo.Round}
      />
    </Stack>
  );
}
