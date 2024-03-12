import { Stack } from '@mui/material';
import { InfoPlayerSolo } from '../InfoPlayerSolo';
import { InfoTeamSolo } from '../InfoTeamSolo';
import { InfoIDSolo } from '../InfoIDSolo';
import { PlayerPort } from '../../../types/scoreboardDefaultValue';
import { TitleDivider } from '../../general/TitleDivider';
import { CharacertSelect } from './InfoCharacterSSBM';
import { InfoPort } from './InfoPort';

type Props = {
  port: PlayerPort;
};

export function InfoPlayerUnitMelee({ port }: Props) {
  return (
    <Stack spacing={1}>
      <TitleDivider text={port} />
      <InfoPlayerSolo port={port} />
      <Stack direction="row" spacing={0.5}>
        <InfoTeamSolo port={port} />
        <InfoIDSolo port={port} />
      </Stack>
      <CharacertSelect port={port} />
      <InfoPort port={port} />
    </Stack>
  );
}
