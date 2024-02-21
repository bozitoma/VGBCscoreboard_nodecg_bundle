import { Stack } from '@mui/material';

import { PlayerPort } from '../../../types/scoreboardDefaultValue';
import { TitleDivider } from '../../general/TitleDivider';
import { InfoPortRadio } from './InfoPortRadio';

type Props = {
  port: PlayerPort;
};

export function InfoPort({ port }: Props) {
  return (
    <Stack direction="row" alignItems="center">
      <TitleDivider text="port" />
      <InfoPortRadio port={port} selectPort="Player1" />
      <InfoPortRadio port={port} selectPort="Player2" />
      <InfoPortRadio port={port} selectPort="Player3" />
      <InfoPortRadio port={port} selectPort="Player4" />
    </Stack>
  );
}
