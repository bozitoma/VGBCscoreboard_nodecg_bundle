import { Stack } from '@mui/material';
import { BracketRoundFieldSolo } from './BracketRoundFieldSolo';
import { useBracket } from '../../hooks/useBracket';
import { TitleDivider } from '../general/TitleDivider';
import { useRecoilValue } from 'recoil';
import { bracketRoundAtom } from '../../store/atomBracket';

type Props = {
  text: string;
  Round1: BracketRoundName;
  Round2: BracketRoundName;
  Round3: BracketRoundName;
  Round4: BracketRoundName;
  Round5: BracketRoundName;
};

export function BracketRoundFieldUnit({ text, Round1, Round2, Round3, Round4, Round5 }: Props) {
  const bracketRound = useRecoilValue(bracketRoundAtom);
  const { bracketRoundEdit } = useBracket();

  return (
    <>
      <TitleDivider text={text} />
      <Stack spacing={2} direction="row">
        <BracketRoundFieldSolo
          id={Round1}
          value={bracketRound[Round1]}
          onChange={bracketRoundEdit}
        />
        <BracketRoundFieldSolo
          id={Round2}
          value={bracketRound[Round2]}
          onChange={bracketRoundEdit}
        />
        <BracketRoundFieldSolo
          id={Round3}
          value={bracketRound[Round3]}
          onChange={bracketRoundEdit}
        />
        <BracketRoundFieldSolo
          id={Round4}
          value={bracketRound[Round4]}
          onChange={bracketRoundEdit}
        />
        <BracketRoundFieldSolo
          id={Round5}
          value={bracketRound[Round5]}
          onChange={bracketRoundEdit}
        />
      </Stack>
    </>
  );
}
