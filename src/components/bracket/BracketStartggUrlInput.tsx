import { useRecoilState, useRecoilValue } from 'recoil';
import { MouseEventHandler } from 'react';
import { useGetBracket } from '../../hooks/startggAPI/useGetBracket';
import { URLInput } from '../general/URLInput';
import {
  bracketCompletedAlertAtom,
  bracketErrorAlertAtom,
  bracketLoadingAtom,
  bracketStartggUrlAtom,
} from '../../store/atomBracket';
import { ModalAlert } from '../general/ModalAlert';

export function BracketStartggUrlInput() {
  const [url, setUrl] = useRecoilState(bracketStartggUrlAtom);
  const isLoading = useRecoilValue(bracketLoadingAtom);
  const [completedAlert, setCompletedAlert] = useRecoilState(bracketCompletedAlertAtom);
  const [errorAlert, setErrorAlert] = useRecoilState(bracketErrorAlertAtom);

  const { handleGetSets } = useGetBracket();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    handleGetSets();
  };

  return (
    <>
      <URLInput
        id="Start.GG-Bracket"
        label="Start.GG URL"
        url={url}
        setUrl={setUrl}
        onClick={handleClick}
        width={630}
        isLoading={isLoading}
      />

      {/* 読み込み成功のアラート */}
      <ModalAlert
        state={completedAlert}
        setState={setCompletedAlert}
        text="Update has been completed bracket of Start.GG!"
        severity="success"
      />

      {/*エラーのアラート */}
      <ModalAlert state={errorAlert} setState={setErrorAlert} text="Error!" severity="error" />
    </>
  );
}
