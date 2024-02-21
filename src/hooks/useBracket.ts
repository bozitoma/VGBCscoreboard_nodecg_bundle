import { ChangeEvent, ChangeEventHandler } from "react";
import { useRecoilState } from "recoil";
import { bracketRoundAtom } from "../store/atomBracket";

export const useBracket = () => {
  const [bracketRound, setBracketRound] = useRecoilState(bracketRoundAtom);

  const bracketRoundEdit: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event: ChangeEvent<HTMLInputElement>) => {
    setBracketRound((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  return {
    bracketRound,
    bracketRoundEdit,
  };
};
