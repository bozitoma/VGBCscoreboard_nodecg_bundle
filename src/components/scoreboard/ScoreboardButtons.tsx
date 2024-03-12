import { Button, Stack } from '@mui/material';
import { useState } from 'react';

// Marerial Icons
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { ModalAlert } from '../general/ModalAlert';
import { DialogAlert } from '../general/DialogAlert';
import { scoreboradInfoAtom } from '../../store/atomScoreboard';
import { useRecoilState } from 'recoil';
import { useRepList } from '../../hooks/replicant/useRepList';
import { scoreboardDefaultValue } from '../../types/scoreboardDefaultValue';

export const ScoreboardButtons = () => {
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);
  const { repInformation, setRepInformation } = useRepList();

  // Submitのスナックバー
  const [submitOpen, setSubmitOpen] = useState(false);

  // Resetのモーダルアラート
  const [resetOpen, setResetOpen] = useState(false);
  const handleResetOpen = () => {
    setResetOpen(true);
  };

  // Reset完了のスナックバー
  const [resetCompleteOpen, setResetCompleteOpen] = useState(false);

  const submit = () => {
    setRepInformation({
      Message: scoreboradInfo.Message,
      TournamentName: scoreboradInfo.TournamentName,
      Round: scoreboradInfo.Round,
      BestOf: scoreboradInfo.BestOf,
      Player1: scoreboradInfo.Player1,
      Player2: scoreboradInfo.Player2,
      Player3: scoreboradInfo.Player3,
      Player4: scoreboradInfo.Player4,
      Score: {
        Player1: scoreboradInfo.Score.Player1,
        Player2: scoreboradInfo.Score.Player2,
      },
    });
    setSubmitOpen(true); // Submit完了のスナックバーを表示
  };

  const reset = () => {
    setScoreboradInfo({
      Message: '',
      TournamentName: '',
      Round: '',
      BestOf: '',
      Player1: scoreboardDefaultValue,
      Player2: scoreboardDefaultValue,
      Player3: scoreboardDefaultValue,
      Player4: scoreboardDefaultValue,
      Score: {
        Player1: 0,
        Player2: 0,
      },
    });
    setResetOpen(false); // Resetのモーダルを閉じる
    setResetCompleteOpen(true); // Reset完了のスナックバーを表示
  };

  const restore = () => {
    if (repInformation !== undefined) {
      setScoreboradInfo({
        Message: repInformation.Message,
        TournamentName: repInformation.TournamentName,
        Round: repInformation.Round,
        BestOf: repInformation.BestOf,
        Player1: repInformation.Player1,
        Player2: repInformation.Player2,
        Player3: repInformation.Player3,
        Player4: repInformation.Player4,
        Score: {
          Player1: repInformation.Score.Player1,
          Player2: repInformation.Score.Player2,
        },
      });
    }
  };

  return (
    <>
      <Stack justifyContent="center" direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          sx={{ width: 330 }}
          onClick={submit}
        >
          SUBMIT
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ width: 150 }}
          onClick={handleResetOpen}
        >
          RESET
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ReplayIcon />}
          sx={{ width: 150 }}
          onClick={restore}
        >
          RESTORE
        </Button>
      </Stack>

      {/* Submitのスナックバー */}
      <ModalAlert
        state={submitOpen}
        setState={setSubmitOpen}
        text="Update has been completed scoreboard!"
        severity="success"
      />

      {/* Reset完了のスナックバー */}
      <ModalAlert
        state={resetCompleteOpen}
        setState={setResetCompleteOpen}
        text="Reset has been completed scoreboard!"
        severity="success"
      />

      {/* Resetのモーダル */}
      <DialogAlert
        state={resetOpen}
        setState={setResetOpen}
        text="Do you want to reset the scoreboard?"
        reset={reset}
      />
    </>
  );
};
