import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type Props = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  text: string;
  reset: () => void;
};

export function DialogAlert({ state, setState, text, reset }: Props) {
  const handleResetClose = () => {
    setState(false);
  };

  return (
    <>
      <Dialog open={state} onClose={handleResetClose}>
        <DialogTitle>{text}</DialogTitle>
        <DialogActions>
          <Button onClick={handleResetClose}>Cancel</Button>
          <Button onClick={reset} variant="contained" color="error" autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
