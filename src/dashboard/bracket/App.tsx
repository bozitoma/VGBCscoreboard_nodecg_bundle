import { Divider, Stack } from '@mui/material';
import './App.css';
import { RecoilRoot } from 'recoil';
import { BracketButtons } from '../../components/bracket/BracketButtons';
import { BracketStartggUrlInput } from '../../components/bracket/BracketStartggUrlInput';
import { BracketEditField } from '../../components/bracket/BracketEditField';

function App() {
  return (
    <RecoilRoot>
      <Stack spacing={2}>
        <Stack spacing={2} direction="row">
          <BracketButtons />
          <Divider orientation="vertical" flexItem />
          <BracketStartggUrlInput />
        </Stack>
        <BracketEditField />
      </Stack>
    </RecoilRoot>
  );
}

export default App;
