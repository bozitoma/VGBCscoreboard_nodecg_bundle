import { Button } from '@mui/material';
import { useCommentator } from '../../hooks/useCommentator';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import { CommentatorText } from '../../types/commentatorDefaultValue';

type Props = {
  swap1: CommentatorText;
  swap2: CommentatorText;
  text: string;
};

export function CommentatorSwapButtonSolo({ swap1, swap2, text }: Props) {
  const { commentatorSwap } = useCommentator();
  return (
    <>
      <Button
        onClick={() => commentatorSwap(swap1, swap2)}
        variant="outlined"
        startIcon={<SwapVerticalCircleIcon />}
        sx={{ width: 214 }}
      >
        {text}
      </Button>
    </>
  );
}
