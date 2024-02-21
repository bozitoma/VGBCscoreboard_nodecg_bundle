import { TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { scoreboradInfoAtom } from '../../store/atomScoreboard';
import { ChangeEventHandler } from 'react';

export function InfoMessage() {
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);

  const messageEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Message: event.target.value,
    }));
  };

  return (
    <TextField
      id="InfoMessage"
      label="Message"
      variant="outlined"
      sx={{ width: 676 }}
      size="small"
      value={scoreboradInfo.Message}
      onChange={messageEdit}
    />
  );
}
