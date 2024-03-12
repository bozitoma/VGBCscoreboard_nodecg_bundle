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

type Player = 'Player1' | 'Player2';

export function ScoreCounter() {
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);

  const scoreIncrement: MouseEventHandler<HTMLButtonElement> | MouseEvent = (event) => {
    const player: Player = event.currentTarget.id as Player;
    setScoreboradInfo((prev) => ({
      ...prev,
      Score: {
        ...prev.Score,
        [player]: prev.Score[player] + 1,
      },
    }));
  };

  const scoreDecrement: MouseEventHandler<HTMLButtonElement> = (event) => {
    const player: Player = event.currentTarget.id as Player;
    setScoreboradInfo((prev) => ({
      ...prev,
      Score: {
        ...prev.Score,
        [player]: prev.Score[player] - 1,
      },
    }));
  };

  const reset = () => {
    setScoreboradInfo((prev) => ({
      ...prev,
      Score: {
        Player1: 0,
        Player2: 0,
      },
    }));
  };

  return (
    <Stack spacing={2}>
      <TitleDivider text="Score" />
      <Stack direction="row" spacing={2}>
        <ButtonGroup>
          <StyledInput size="small" value={scoreboradInfo.Score.Player1} />
          <StyledButton
            id="Player1"
            onClick={scoreDecrement}
            disabled={scoreboradInfo.Score.Player1 === 0}
          >
            <RemoveIcon fontSize="small" />
          </StyledButton>
          <StyledButton
            id="Player1"
            onClick={scoreIncrement}
            disabled={scoreboradInfo.Score.Player1 === 3}
          >
            <AddIcon fontSize="small" />
          </StyledButton>
        </ButtonGroup>
        <IconButton color="primary" onClick={reset}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <ButtonGroup>
          <StyledButton
            id="Player2"
            onClick={scoreIncrement}
            disabled={scoreboradInfo.Score.Player2 === 3}
          >
            <AddIcon fontSize="small" />
          </StyledButton>
          <StyledButton
            id="Player2"
            onClick={scoreDecrement}
            disabled={scoreboradInfo.Score.Player2 === 0}
          >
            <RemoveIcon fontSize="small" />
          </StyledButton>
          <StyledInput size="small" value={scoreboradInfo.Score.Player2} />
        </ButtonGroup>
      </Stack>
    </Stack>
  );
}
