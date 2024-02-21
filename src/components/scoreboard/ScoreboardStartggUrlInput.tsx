import { useRecoilState, useRecoilValue } from 'recoil';
import { MouseEventHandler } from 'react';
import { URLInput } from '../general/URLInput';
import { useGetMatch } from '../../hooks/startggAPI/useGetMatch';
import {
  matchesCompletedAlertAtom,
  matchesErrorAlertAtom,
  matchesLoadingAtom,
  scoreboardStartggUrlAtom,
} from '../../store/atomScoreboard';
import { ModalAlert } from '../general/ModalAlert';

export function ScoreboardStartggUrlInput() {
  const [url, setUrl] = useRecoilState(scoreboardStartggUrlAtom);
  const isLoading = useRecoilValue(matchesLoadingAtom);
  const [completedAlert, setCompletedAlert] = useRecoilState(matchesCompletedAlertAtom);
  const [errorAlert, setErrorAlert] = useRecoilState(matchesErrorAlertAtom);

  const { handleGetMatches } = useGetMatch();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    handleGetMatches();
  };

  return (
    <>
      <URLInput
        id="Start.GG-Match"
        label="Start.GG URL"
        url={url}
        setUrl={setUrl}
        onClick={handleClick}
        width={700}
        isLoading={isLoading}
      />

      {/* 読み込み成功のアラート */}
      <ModalAlert
        state={completedAlert}
        setState={setCompletedAlert}
        text="Update has been completed matches of Start.GG!"
        severity="success"
      />

      {/*エラーのアラート */}
      <ModalAlert state={errorAlert} setState={setErrorAlert} text="Error!" severity="error" />
    </>
  );
}
