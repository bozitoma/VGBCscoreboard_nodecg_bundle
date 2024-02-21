import { Box, Stack } from "@mui/material";
import { CommentatorInfoUnit } from "./CommentatorInfoUnit";
import { CommentatorSwapButtons } from "./CommentatorSwapButtons";
import { CommentatorButtons } from "./CommentatorButtons";
import { useStyled } from "../../hooks/useStyled";

export function CommentatorInfo() {
  const { Heading } = useStyled();

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        <Heading>Commentator</Heading>
        <CommentatorInfoUnit commentator="commentator1" />
        <CommentatorInfoUnit commentator="commentator2" />
        <CommentatorInfoUnit commentator="commentator3" />
        <CommentatorInfoUnit commentator="commentator4" />
        <CommentatorSwapButtons />
        <CommentatorButtons />
      </Stack>
    </Box>
  );
}
