import { Stack } from '@mui/material';
import './App.css';
import { RecoilRoot } from 'recoil';
import { CommentatorInfo } from '../../components/commentator/CommentatorInfo';
import { CommentatorTable } from '../../components/commentator/CommentatorTable';

function App() {
  return (
    <RecoilRoot>
      <Stack spacing={2} direction="row" justifyContent="center">
        <CommentatorInfo />
        <CommentatorTable />
      </Stack>
    </RecoilRoot>
  );
}

export default App;
