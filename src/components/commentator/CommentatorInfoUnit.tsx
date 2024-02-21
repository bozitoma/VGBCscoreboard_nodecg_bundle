import { ChangeEventHandler } from 'react';
import { CommentatorInfoSolo } from './CommentatorInfoSolo';
import { useRecoilState } from 'recoil';
import { commentatorAtom } from '../../store/atomCommentator';
import { CommentatorText } from '../../types/commentatorDefaultValue';
import { useCommentator } from '../../hooks/useCommentator';
import { Button, Stack } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

type Props = {
  commentator: CommentatorText;
};

export function CommentatorInfoUnit({ commentator }: Props) {
  const [commentatorInfo, setCommentatorInfo] = useRecoilState(commentatorAtom);
  const { commentatorSubmit } = useCommentator();

  const commentatorNameEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event
  ) => {
    if (event.target.id === `${commentator}-name`) {
      setCommentatorInfo((prev) => ({
        ...prev,
        [commentator]: {
          ...prev[commentator],
          name: event.target.value,
        },
      }));
    }
  };

  const commentatorAccountEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event
  ) => {
    if (event.target.id === `${commentator}-account`) {
      setCommentatorInfo((prev) => ({
        ...prev,
        [commentator]: {
          ...prev[commentator],
          account: event.target.value,
        },
      }));
    }
  };

  const commentatorTagEdit: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event
  ) => {
    if (event.target.id === `${commentator}-tag`) {
      setCommentatorInfo((prev) => ({
        ...prev,
        [commentator]: {
          ...prev[commentator],
          tag: event.target.value,
        },
      }));
    }
  };

  return (
    <Stack spacing={2} direction="row">
      <CommentatorInfoSolo
        commentator={commentator}
        value={commentatorInfo}
        onChangeName={commentatorNameEdit}
        onChangeAccount={commentatorAccountEdit}
        onChangeTag={commentatorTagEdit}
      />
      <Button
        onClick={() => commentatorSubmit(commentator)}
        variant="contained"
        startIcon={<KeyboardDoubleArrowLeftIcon />}
      />
    </Stack>
  );
}
