import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';
import rivefile from '../../assets/vgbc.riv';
import { useRepList } from '../../hooks/replicant/useRepList';

export const Rive = () => {
  const { repInformation } = useRepList();

  const { rive, RiveComponent } = useRive({
    src: rivefile,
    artboard: 'ScoreboardSSBU',
    stateMachines: 'Scoreboard',
    autoplay: true,
  });

  const Round = repInformation?.Round;
  const BestOf = repInformation?.BestOf;
  const Name1P = repInformation?.Player1.name;
  const Name2P = repInformation?.Player2.name;
  const Score1P = repInformation?.Score.Player1;
  const Score2P = repInformation?.Score.Player2;

  const oldName1P = rive?.getTextRunValue('player1Name');
  const oldName2P = rive?.getTextRunValue('player2Name');
  const oldScore1P = rive?.getTextRunValue('player1Score');
  const oldScore2P = rive?.getTextRunValue('player2Score');
  const oldRound = rive?.getTextRunValue('roundName');
  const oldBestof = rive?.getTextRunValue('bestofName');

  const isTriggerName1P = useStateMachineInput(rive, 'Scoreboard', 'name1P-Update');
  const isTriggerName2P = useStateMachineInput(rive, 'Scoreboard', 'name2P-Update');
  const isTriggerScore1P = useStateMachineInput(rive, 'Scoreboard', 'score1P-Update');
  const isTriggerScore2P = useStateMachineInput(rive, 'Scoreboard', 'score2P-Update');
  const isTriggerRound = useStateMachineInput(rive, 'Scoreboard', 'round');

  // 最初にページを読み込んだ時にReplicantをテロップに反映させる
  useEffect(() => {
    rive?.setTextRunValue('roundName', Round !== undefined ? Round : '');
    rive?.setTextRunValue('bestofName', BestOf !== undefined ? BestOf : '');
    rive?.setTextRunValue('player1Name', Name1P !== undefined ? Name1P : '');
    rive?.setTextRunValue('player2Name', Name2P !== undefined ? Name2P : '');
    rive?.setTextRunValue('player1Score', String(Score1P));
    rive?.setTextRunValue('player2Score', String(Score2P));
  }, [rive?.setTextRunValue]);

  // Replicantの更新をテロップに反映させる
  useEffect(() => {
    if (Round !== oldRound || BestOf !== oldBestof) {
      isTriggerRound?.fire();
      rive?.setTextRunValue('roundName', Round !== undefined ? Round : '');
      rive?.setTextRunValue('bestofName', BestOf !== undefined ? BestOf : '');
    }
    if (Name1P !== oldName1P) {
      isTriggerName1P?.fire();
      rive?.setTextRunValue('player1Name', Name1P !== undefined ? Name1P : '');
    }
    if (Name2P !== oldName2P) {
      isTriggerName2P?.fire();
      rive?.setTextRunValue('player2Name', Name2P !== undefined ? Name2P : '');
    }
    if (Score1P !== Number(oldScore1P)) {
      isTriggerScore1P?.fire();
      rive?.setTextRunValue('player1Score', String(Score1P));
    }
    if (Score2P !== Number(oldScore2P)) {
      isTriggerScore2P?.fire();
      rive?.setTextRunValue('player2Score', String(Score2P));
    }
  }, [repInformation]);

  return (
    <>
      <>{repInformation !== undefined && <RiveComponent style={{ width: 1920, height: 1080 }} />}</>
    </>
  );
};
