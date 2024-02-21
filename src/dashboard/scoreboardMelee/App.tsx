import './App.css';
import { RecoilRoot } from 'recoil';
import { Stack } from '@mui/material';
import { ScoreboardEditor } from '../../components/scoreboard/melee/ScoreboardEditorMelee';
import { MatchesTable } from '../../components/scoreboard/MatchesTable';

function App() {
  return (
    <RecoilRoot>
      <Stack spacing={2} direction="row" justifyContent="center">
        <ScoreboardEditor />
        <MatchesTable />
      </Stack>
    </RecoilRoot>
  );
}

export default App;
