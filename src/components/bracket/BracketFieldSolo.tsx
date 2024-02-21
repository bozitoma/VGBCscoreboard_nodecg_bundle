import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ChangeEventHandler } from 'react';

type Props = {
  idName: string | undefined;
  valueName: string | undefined;
  onChangeName: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  idScore: string | undefined;
  valueScore: number | undefined;
  onChangeScore: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export function BracketFieldSolo({
  idName,
  valueName,
  onChangeName,
  idScore,
  valueScore,
  onChangeScore,
}: Props) {
  return (
    <Stack spacing={0.5} direction="row">
      <TextField
        id={idName}
        label="Player name"
        variant="outlined"
        sx={{ width: 140 }}
        size="small"
        value={valueName}
        onChange={onChangeName}
      />
      <TextField
        id={idScore}
        type="number"
        variant="outlined"
        sx={{ width: 60 }}
        size="small"
        value={valueScore}
        onChange={onChangeScore}
        InputProps={{
          inputProps: {
            min: -1,
            max: 3,
          },
        }}
      />
    </Stack>
  );
}
