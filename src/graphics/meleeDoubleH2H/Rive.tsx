import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';
import rivefile from '../../assets/bgw.riv';
import { useRepList } from '../../hooks/replicant/useRepList';

export const Rive = () => {
  const { repInformation } = useRepList();

  const { rive, RiveComponent } = useRive({
    src: rivefile,
    artboard: 'DoubleH2H',
    stateMachines: 'H2H',
    autoplay: true,
  });

  const Round = repInformation?.Round;
  const BestOf = repInformation?.BestOf;
  const Name1P = repInformation?.Player1.name;
  const Name2P = repInformation?.Player2.name;
  const Name3P = repInformation?.Player3.name;
  const Name4P = repInformation?.Player4.name;
  const Score1P = repInformation?.Player1.score;
  const Score2P = repInformation?.Player2.score;

  const oldName1P = rive?.getTextRunValue('player1Name');
  const oldName2P = rive?.getTextRunValue('player2Name');
  const oldName3P = rive?.getTextRunValue('player3Name');
  const oldName4P = rive?.getTextRunValue('player4Name');
  const oldScore1P = rive?.getTextRunValue('player1Score');
  const oldScore2P = rive?.getTextRunValue('player2Score');
  const oldRound = rive?.getTextRunValue('roundName');
  const oldBestof = rive?.getTextRunValue('bestofName');

  const isTriggerName1P = useStateMachineInput(rive, 'H2H', 'name1p-update');
  const isTriggerName2P = useStateMachineInput(rive, 'H2H', 'name2p-update');
  const isTriggerName3P = useStateMachineInput(rive, 'H2H', 'name3p-update');
  const isTriggerName4P = useStateMachineInput(rive, 'H2H', 'name4p-update');
  const isTriggerScore1P = useStateMachineInput(rive, 'H2H', 'score1p-update');
  const isTriggerScore2P = useStateMachineInput(rive, 'H2H', 'score2p-update');
  const isTriggerRound = useStateMachineInput(rive, 'H2H', 'round-update');
  const isTriggerBestof = useStateMachineInput(rive, 'H2H', 'bestof-update');

  // 最初にページを読み込んだ時にReplicantをテロップに反映させる
  useEffect(() => {
    rive?.setTextRunValue('roundName', Round !== undefined ? Round : '');
    rive?.setTextRunValue('bestofName', BestOf !== undefined ? BestOf : '');
    rive?.setTextRunValue('player1Name', Name1P !== undefined ? Name1P : '');
    rive?.setTextRunValue('player2Name', Name2P !== undefined ? Name2P : '');
    rive?.setTextRunValue('player3Name', Name3P !== undefined ? Name3P : '');
    rive?.setTextRunValue('player4Name', Name4P !== undefined ? Name4P : '');
    rive?.setTextRunValue('player1Score', String(Score1P));
    rive?.setTextRunValue('player2Score', String(Score2P));
  }, [rive?.setTextRunValue]);

  // Replicantの更新をテロップに反映させる
  useEffect(() => {
    if (Round !== oldRound) {
      isTriggerRound?.fire();
      rive?.setTextRunValue('roundName', Round !== undefined ? Round : '');
    }
    if (BestOf !== oldBestof) {
      isTriggerBestof?.fire();
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
    if (Name3P !== oldName3P) {
      isTriggerName3P?.fire();
      rive?.setTextRunValue('player3Name', Name3P !== undefined ? Name3P : '');
    }
    if (Name4P !== oldName4P) {
      isTriggerName4P?.fire();
      rive?.setTextRunValue('player4Name', Name4P !== undefined ? Name4P : '');
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
