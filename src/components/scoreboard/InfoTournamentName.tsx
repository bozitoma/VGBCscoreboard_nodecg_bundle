import { TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { scoreboradInfoAtom } from '../../store/atomScoreboard';
import { ChangeEventHandler } from 'react';

export function InfoTournamentName() {
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);

  const tournamentNameEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event
  ) => {
    setScoreboradInfo((prev) => ({
      ...prev,
      TournamentName: event.target.value,
    }));
  };

  return (
    <TextField
      id="InfoTournament"
      label="Tournament Name"
      variant="outlined"
      sx={{ width: 216 }}
      size="small"
      value={scoreboradInfo.TournamentName}
      onChange={tournamentNameEdit}
    />
  );
}
