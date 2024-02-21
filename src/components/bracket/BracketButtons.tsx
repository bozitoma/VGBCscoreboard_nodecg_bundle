import { Button, Stack } from '@mui/material';
import { useRecoilState } from 'recoil';
import { bracketResultAtom, bracketRoundAtom } from '../../store/atomBracket';

// Marerial Icons
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { useState } from 'react';
import { ModalAlert } from '../general/ModalAlert';
import { DialogAlert } from '../general/DialogAlert';
import { useRepList } from '../../hooks/replicant/useRepList';
import { bracketRoundName, bracketRoundText } from '../../types/bracketResultDefaultValue';
import { replicantDefaultValues } from '../../types/replicant';

export function BracketButtons() {
  const [bracketScore, setBracketScore] = useRecoilState(bracketResultAtom);
  const [bracketRound, setBracketRound] = useRecoilState(bracketRoundAtom);

  const { repBracket, setRepBracket } = useRepList();

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
    setRepBracket({
      WQFa: bracketScore.WQFa,
      WQFb: bracketScore.WQFb,
      WQFc: bracketScore.WQFc,
      WQFd: bracketScore.WQFd,
      WSFa: bracketScore.WSFa,
      WSFb: bracketScore.WSFb,
      WF: bracketScore.WF,
      LTOP16a: bracketScore.LTOP16a,
      LTOP16b: bracketScore.LTOP16b,
      LTOP16c: bracketScore.LTOP16c,
      LTOP16d: bracketScore.LTOP16d,
      LTOP8a: bracketScore.LTOP8a,
      LTOP8b: bracketScore.LTOP8b,
      LQFa: bracketScore.LQFa,
      LQFb: bracketScore.LQFb,
      LSF: bracketScore.LSF,
      LF: bracketScore.LF,
      GF: bracketScore.GF,
      GF2: bracketScore.GF2,
      BracketRound: bracketRound,
    });
    console.log(repBracket?.WQFa);

    setSubmitOpen(true); // Submit完了のスナックバーを表示
  };

  const restore = () => {
    if (repBracket !== undefined) {
      bracketRoundName.map((round) => {
        setBracketRound((prev) => ({
          ...prev,
          [round]: repBracket.BracketRound[round],
        }));
      });
      bracketRoundText.map((round) => {
        setBracketScore((prev) => ({
          ...prev,
          [round]: repBracket[round],
        }));
      });
    }
  };

  const reset = () => {
    bracketRoundText.map((round) => {
      setBracketScore((prev) => ({
        ...prev,
        [round]: {
          name1p: '',
          name2p: '',
          score1p: -1,
          score2p: -1,
        },
      }));
    });
    bracketRoundName.map((round) => {
      setBracketRound((prev) => ({
        ...prev,
        [round]: replicantDefaultValues.Bracket.BracketRound[round],
      }));
    });
    setResetOpen(false); // Resetのモーダルを閉じる
    setResetCompleteOpen(true); // Reset完了のスナックバーを表示
  };

  return (
    <Stack direction="row" spacing={1.5}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
        sx={{ width: 250 }}
        onClick={submit}
      >
        SUBMIT
      </Button>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        sx={{ width: 120 }}
        onClick={handleResetOpen}
      >
        RESET
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ReplayIcon />}
        sx={{ width: 120 }}
        onClick={restore}
      >
        RESTORE
      </Button>

      {/* Submitのスナックバー */}
      <ModalAlert
        state={submitOpen}
        setState={setSubmitOpen}
        text="Update has been completed brackets!"
        severity="success"
      />

      {/* Reset完了のスナックバー */}
      <ModalAlert
        state={resetCompleteOpen}
        setState={setResetCompleteOpen}
        text="Reset has been completed brackets!"
        severity="success"
      />

      {/* Resetのモーダル */}
      <DialogAlert
        state={resetOpen}
        setState={setResetOpen}
        text="Do you want to reset the brackets?"
        reset={reset}
      />
    </Stack>
  );
}
