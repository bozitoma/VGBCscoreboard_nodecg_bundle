import { Stack } from "@mui/material";
import { CommentatorSwapButtonSolo } from "./CommentatorSwapButtonSolo";

export function CommentatorSwapButtons() {
  return (
    <Stack spacing={2} direction="row">
      <CommentatorSwapButtonSolo
        swap1="commentator1"
        swap2="commentator2"
        text="1-2 SWAP"
      />
      <CommentatorSwapButtonSolo
        swap1="commentator2"
        swap2="commentator3"
        text="2-3 SWAP"
      />
      <CommentatorSwapButtonSolo
        swap1="commentator3"
        swap2="commentator4"
        text="3-4 SWAP"
      />
    </Stack>
  );
}
