import { Button, Stack } from '@mui/material';

// Marerial Icons
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { useRecoilState } from 'recoil';
import { commentatorAtom } from '../../store/atomCommentator';
import { ModalAlert } from '../general/ModalAlert';
import { DialogAlert } from '../general/DialogAlert';
import { useState } from 'react';
import { useRepList } from '../../hooks/replicant/useRepList';
import { CommentatorText } from '../../types/commentatorDefaultValue';

const Commentator: CommentatorText[] = [
  'commentator1',
  'commentator2',
  'commentator3',
  'commentator4',
];

export function CommentatorButtons() {
  const [commentatorInfo, setCommentatorInfo] = useRecoilState(commentatorAtom);
  const { repCommentator, setRepCommentator } = useRepList();

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
    setRepCommentator({
      commentator1: {
        name: commentatorInfo.commentator1.name,
        account: commentatorInfo.commentator1.account,
        tag: commentatorInfo.commentator1.tag,
      },
      commentator2: {
        name: commentatorInfo.commentator2.name,
        account: commentatorInfo.commentator2.account,
        tag: commentatorInfo.commentator2.tag,
      },
      commentator3: {
        name: commentatorInfo.commentator3.name,
        account: commentatorInfo.commentator3.account,
        tag: commentatorInfo.commentator3.tag,
      },
      commentator4: {
        name: commentatorInfo.commentator4.name,
        account: commentatorInfo.commentator4.account,
        tag: commentatorInfo.commentator4.tag,
      },
    });
    setSubmitOpen(true); // Submit完了のスナックバーを表示
  };

  const restore = () => {
    if (repCommentator !== undefined) {
      Commentator.map((commentator) => {
        setCommentatorInfo((prev) => ({
          ...prev,
          [commentator]: {
            name: repCommentator[commentator].name,
            account: repCommentator[commentator].account,
            tag: repCommentator[commentator].tag,
          },
        }));
      });
    }
  };

  const reset = () => {
    Commentator.map((commentator) => {
      setCommentatorInfo((prev) => ({
        ...prev,
        [commentator]: {
          name: '',
          account: '',
          tag: '',
        },
      }));
    });
    setResetOpen(false); // Resetのモーダルを閉じる
    setResetCompleteOpen(true); // Reset完了のスナックバーを表示
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
        sx={{ width: 340 }}
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

      {/* Submitのスナックバー */}
      <ModalAlert
        state={submitOpen}
        setState={setSubmitOpen}
        text="Update has been completed commentators!"
        severity="success"
      />

      {/* Reset完了のスナックバー */}
      <ModalAlert
        state={resetCompleteOpen}
        setState={setResetCompleteOpen}
        text="Reset has been completed commentators!"
        severity="success"
      />

      {/* Resetのモーダル */}
      <DialogAlert
        state={resetOpen}
        setState={setResetOpen}
        text="Do you want to reset the commentators?"
        reset={reset}
      />
    </Stack>
  );
}
