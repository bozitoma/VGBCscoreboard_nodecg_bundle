import { ChangeEvent, ChangeEventHandler } from 'react';
import { useSetRecoilState } from 'recoil';
import { bracketRoundAtom } from '../store/atomBracket';

export const useBracket = () => {
  const setBracketRound = useSetRecoilState(bracketRoundAtom);

  const bracketRoundEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setBracketRound((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  return {
    bracketRoundEdit,
  };
};
