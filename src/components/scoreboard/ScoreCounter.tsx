// 参考 https://codesandbox.io/s/material-ui-counter-yo5tx?file=/src/App.js:0-1618
import { ButtonGroup, Button, TextField, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { MouseEventHandler } from 'react';
import { useRecoilState } from 'recoil';
import { scoreboradInfoAtom } from '../../store/atomScoreboard';
import { TitleDivider } from '../general/TitleDivider';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[50]),
  backgroundColor: blueGrey[50],
  borderColor: blueGrey[200],
  '&:hover': {
    backgroundColor: blueGrey[100],
    borderColor: blueGrey[300],
  },
}));

const StyledInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: 2,
      borderColor: blueGrey[200],
    },
    '&:hover fieldset': {
      borderColor: blueGrey[300],
    },
    '&.Mui-focused fieldset': {
      borderColor: blueGrey[500],
    },
    '& input': {
      textAlign: 'center',
      width: 170,
      color: blueGrey[700],
    },
  },
});

export function ScoreCounter() {
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);

  const score1PIncrement: MouseEventHandler<HTMLButtonElement> = () => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Player1: {
        ...prev.Player1,
        score: prev.Player1.score + 1,
      },
    }));
  };

  const score2PIncrement: MouseEventHandler<HTMLButtonElement> = () => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Player2: {
        ...prev.Player2,
        score: prev.Player2.score + 1,
      },
    }));
  };

  const score1PDecrement: MouseEventHandler<HTMLButtonElement> = () => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Player1: {
        ...prev.Player1,
        score: prev.Player1.score - 1,
      },
    }));
  };

  const score2PDecrement: MouseEventHandler<HTMLButtonElement> = () => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Player2: {
        ...prev.Player2,
        score: prev.Player2.score - 1,
      },
    }));
  };

  const reset = () => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Player1: {
        ...prev.Player1,
        score: 0,
      },
      Player2: {
        ...prev.Player2,
        score: 0,
      },
    }));
  };

  return (
    <Stack spacing={2}>
      <TitleDivider text="Score" />
      <Stack direction="row" spacing={2}>
        <ButtonGroup>
          <StyledInput size="small" value={scoreboradInfo.Player1.score} />
          <StyledButton onClick={score1PDecrement} disabled={scoreboradInfo.Player1.score === 0}>
            <RemoveIcon fontSize="small" />
          </StyledButton>
          <StyledButton onClick={score1PIncrement} disabled={scoreboradInfo.Player1.score === 3}>
            <AddIcon fontSize="small" />
          </StyledButton>
        </ButtonGroup>
        <IconButton color="primary" onClick={reset}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <ButtonGroup>
          <StyledButton onClick={score2PIncrement} disabled={scoreboradInfo.Player2.score === 3}>
            <AddIcon fontSize="small" />
          </StyledButton>
          <StyledButton onClick={score2PDecrement} disabled={scoreboradInfo.Player2.score === 0}>
            <RemoveIcon fontSize="small" />
          </StyledButton>
          <StyledInput size="small" value={scoreboradInfo.Player2.score} />
        </ButtonGroup>
      </Stack>
    </Stack>
  );
}
