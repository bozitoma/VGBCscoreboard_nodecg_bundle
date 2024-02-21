import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect, useLayoutEffect } from 'react';
import rivefile from '../../assets/vgbc.riv';
import { useRepList } from '../../hooks/replicant/useRepList';
import { bracketRoundName, bracketRoundText } from '../../types/bracketResultDefaultValue';

export const Rive = () => {
  const { repBracket } = useRepList();

  const { rive, RiveComponent } = useRive({
    src: rivefile,
    artboard: 'DoubleBracket',
    stateMachines: 'Bracket',
    autoplay: true,
  });

  const isTriggerRound = useStateMachineInput(rive, 'Bracket', 'roundUpdate');
  const isTriggerPlayer = useStateMachineInput(rive, 'Bracket', 'playerUpdate');

  const bracketUpdate = () => {
    if (repBracket !== undefined) {
      bracketRoundName.map((roundName) => {
        const RoundName = repBracket?.BracketRound[roundName];
        rive?.setTextRunValue(`${roundName}-round`, RoundName !== undefined ? RoundName : '');
      });

      bracketRoundText.map((roundText) => {
        const Name1p = repBracket[roundText].name1p;
        const Name2p = repBracket[roundText].name2p;
        const Score1p = repBracket[roundText].score1p;
        const Score2p = repBracket[roundText].score2p;

        rive?.setTextRunValue(`${roundText}-player1Name`, Name1p !== undefined ? Name1p : '');
        rive?.setTextRunValue(`${roundText}-player2Name`, Name2p !== undefined ? Name2p : '');
        rive?.setTextRunValue(`${roundText}-player1Score`, Score1p !== -1 ? String(Score1p) : '-');
        rive?.setTextRunValue(`${roundText}-player2Score`, Score2p !== -1 ? String(Score2p) : '-');
      });
    }
  };

  // 最初にページを読み込んだ時にReplicantをテロップに反映させる
  useLayoutEffect(() => {
    bracketUpdate();
  }, [rive?.setTextRunValue]);

  // Replicantの更新をテロップに反映させる
  useEffect(() => {
    bracketUpdate();
    isTriggerRound?.fire();
    isTriggerPlayer?.fire();
  }, [repBracket]);

  return (
    <>
      <>{repBracket !== undefined && <RiveComponent style={{ width: 1920, height: 1080 }} />}</>
    </>
  );
};
