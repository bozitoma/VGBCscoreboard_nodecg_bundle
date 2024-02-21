import { Stack, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { CommentatorText, CommentatorInfo } from '../../types/commentatorDefaultValue';

type Props = {
  value: CommentatorInfo;
  commentator: CommentatorText;
  onChangeName: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChangeAccount: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChangeTag: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
};

export function CommentatorInfoSolo({
  value,
  commentator,
  onChangeName,
  onChangeAccount,
  onChangeTag,
}: Props) {
  return (
    <Stack spacing={2} direction="row">
      <TextField
        id={`${commentator}-name`}
        label="Name"
        variant="standard"
        sx={{ width: 260 }}
        size="small"
        value={value[commentator].name}
        onChange={onChangeName}
      />
      <TextField
        id={`${commentator}-account`}
        label="Account"
        variant="standard"
        sx={{ width: 150 }}
        size="small"
        value={value[commentator].account}
        onChange={onChangeAccount}
      />
      <TextField
        id={`${commentator}-tag`}
        label="Tag"
        variant="standard"
        sx={{ width: 150 }}
        size="small"
        value={value[commentator].tag}
        onChange={onChangeTag}
      />
    </Stack>
  );
}
