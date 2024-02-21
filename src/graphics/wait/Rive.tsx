import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';
import rivefile from '../../assets/vgbc.riv';
import { useRepList } from '../../hooks/replicant/useRepList';

export const Rive = () => {
  const { repInformation } = useRepList();

  const { rive, RiveComponent } = useRive({
    src: rivefile,
    artboard: 'Wait',
    stateMachines: 'Wait',
    autoplay: true,
  });

  const Message = repInformation?.Message;
  const TournamentName = repInformation?.TournamentName;

  const oldMessage = rive?.getTextRunValue('message');
  const oldTournamentName = rive?.getTextRunValue('tournamentName');

  const isTriggerInput = useStateMachineInput(rive, 'Wait', 'Update');

  // 最初にページを読み込んだ時にReplicantをテロップに反映させる
  useEffect(() => {
    rive?.setTextRunValue('message', Message !== undefined ? Message : '');
    rive?.setTextRunValue('tournamentName', TournamentName !== undefined ? TournamentName : '');
  }, [rive?.setTextRunValue]);

  // Replicantの更新をテロップに反映させる
  useEffect(() => {
    if (Message !== oldMessage || TournamentName !== oldTournamentName) {
      isTriggerInput?.fire();
      rive?.setTextRunValue('message', Message !== undefined ? Message : '');
      rive?.setTextRunValue('tournamentName', TournamentName !== undefined ? TournamentName : '');
    }
  }, [repInformation]);

  return (
    <>
      <>{repInformation !== undefined && <RiveComponent style={{ width: 1920, height: 1080 }} />}</>
    </>
  );
};
