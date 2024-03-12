import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from 'react';
import { BracketFieldUnit } from './BracketFieldUnit';
import { useRecoilState } from 'recoil';
import { bracketResultAtom } from '../../store/atomBracket';
import { bracketResultProps } from '../../types/bracketResultDefaultValue';
import { useRepList } from '../../hooks/replicant/useRepList';

type Props = {
  roundName: BracketRoundText;
};

export function BracketField({ roundName }: Props) {
  const [bracketScore, setBracketScore] = useRecoilState(bracketResultAtom);
  const { repInformation } = useRepList();

  const defaultValue = bracketResultProps;

  // test中
  const tournamentInfoAssign: MouseEventHandler<HTMLButtonElement> = () => {
    if (repInformation !== undefined) {
      setBracketScore((prev) => ({
        ...prev,
        [roundName]: {
          name1p: repInformation.Player1.name,
          name2p: repInformation.Player2.name,
          score1p: repInformation.Score.Player1,
          score2p: repInformation.Score.Player2,
        },
      }));
    }
  };

  const tournamentInfoReset: MouseEventHandler<HTMLButtonElement> = (event) => {
    const name = event.currentTarget.name;
    setBracketScore((prev) => ({
      ...prev,
      [name]: defaultValue,
    }));
  };

  const tournamentNameEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.currentTarget.id;
    const idParts = id.split('-');
    const round = idParts[0];
    const key = idParts[1];
    setBracketScore((prev) => ({
      ...prev,
      [round]: {
        ...prev[round as BracketRoundText],
        [key]: event.target.value,
      },
    }));
  };

  const tournamentScoreEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.currentTarget.id;
    const idParts = id.split('-');
    const round = idParts[0];
    const key = idParts[1];
    setBracketScore((prev) => ({
      ...prev,
      [round]: {
        ...prev[round as BracketRoundText],
        [key]: Number(event.target.value),
      },
    }));
  };

  return (
    <>
      <BracketFieldUnit
        // Player
        value={bracketScore}
        // Function
        onChangeName={tournamentNameEdit}
        onChangeScore={tournamentScoreEdit}
        // Button
        name={roundName}
        reset={tournamentInfoReset}
        assign={tournamentInfoAssign}
      />
    </>
  );
}
