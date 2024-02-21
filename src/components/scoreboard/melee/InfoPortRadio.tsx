import { FormControlLabel, Radio } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import { scoreboradInfoAtom } from '../../../store/atomScoreboard';
import { PlayerPort } from '../../../types/scoreboardDefaultValue';
import { red, blue, yellow, green } from '@mui/material/colors';

type Props = {
  port: PlayerPort;
  selectPort: PlayerPort;
};

export function InfoPortRadio({ port, selectPort }: Props) {
  const [infoScoreborad, setInfoScoreboard] = useRecoilState(scoreboradInfoAtom);

  const portEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setInfoScoreboard((prev) => ({
      ...prev,
      [port]: {
        ...prev[port],
        port: event.target.value,
      },
    }));
  };

  const selectColor = () => {
    switch (selectPort) {
      case 'Player1':
        return red[600];
      case 'Player2':
        return blue[600];
      case 'Player3':
        return yellow[600];
      case 'Player4':
        return green[600];
    }
  };

  const Label = () => {
    switch (selectPort) {
      case 'Player1':
        return '1P';
      case 'Player2':
        return '2P';
      case 'Player3':
        return '3P';
      case 'Player4':
        return '4P';
    }
  };

  return (
    <FormControlLabel
      control={
        <Radio
          value={selectPort}
          onChange={portEdit}
          size="small"
          checked={infoScoreborad[port].port === selectPort}
          sx={{
            color: selectColor(),
            '&.Mui-checked': {
              color: selectColor(),
            },
          }}
        />
      }
      label={Label()}
      labelPlacement="bottom"
      sx={{
        marginRight: 1,
      }}
    />
  );
}
