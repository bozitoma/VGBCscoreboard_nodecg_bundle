import { SetterOrUpdater } from "recoil";
import { Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

type Props = {
  id: string;
  label: string;
  url: string;
  setUrl: SetterOrUpdater<string>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  width: number;
  isLoading: boolean;
};

export function URLInput({
  id,
  label,
  url,
  setUrl,
  onClick,
  width,
  isLoading,
}: Props) {
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <Stack spacing={1} direction="row">
      <TextField
        id={id}
        label={label}
        variant="outlined"
        sx={{ width: width }}
        size="small"
        value={url}
        onChange={handleChange}
      />
      <LoadingButton
        variant="contained"
        size="small"
        startIcon={<FileDownloadIcon />}
        loading={isLoading}
        onClick={onClick}
      >
        INPORT
      </LoadingButton>
    </Stack>
  );
}
