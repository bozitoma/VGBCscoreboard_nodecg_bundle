import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Stack, TextField } from '@mui/material';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { scoreboradInfoAtom } from '../../store/atomScoreboard';

export function InfoBestof() {
  const [alignment, setAlignment] = useState('');
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);

  useEffect(() => {
    if (scoreboradInfo.BestOf === 'Best of 5') {
      setAlignment('Best of 5');
    } else if (scoreboradInfo.BestOf === 'Best of 3') {
      setAlignment('Best of 3');
    } else if (scoreboradInfo.BestOf === 'Best of 1') {
      setAlignment('Best of 1');
    } else {
      setAlignment('');
    }
    return;
  }, [scoreboradInfo.BestOf, setAlignment]);

  const handleButtonChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);

    // →ボタンを操作したことで得たターゲットであることを型（HTMLButtonElement）として定義してる
    if ((event.target as HTMLButtonElement).value === scoreboradInfo.BestOf) {
      setScoreboradInfo((prev) => ({
        ...prev,
        BestOf: '',
      }));
    } else {
      setScoreboradInfo((prev) => ({
        ...prev,
        BestOf: (event.target as HTMLButtonElement).value,
      }));
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setScoreboradInfo((prev) => ({
      ...prev,
      BestOf: (event.target as HTMLButtonElement).value,
    }));
  };

  return (
    <Stack spacing={1} direction="row">
      <TextField
        id="InfoBestof"
        label="Best of"
        variant="outlined"
        size="small"
        value={scoreboradInfo.BestOf}
        onChange={handleTextChange}
        sx={{ width: 100 }}
      />
      <ToggleButtonGroup
        id="BestofButton"
        color="primary"
        size="small"
        value={alignment} // 選択中のボタンを取得
        exclusive // 一度に1つのボタンのみを選択する属性
        onChange={handleButtonChange} // クリック時の挙動
        aria-label="Platform"
      >
        <ToggleButton value="Best of 1">Bo1</ToggleButton>
        <ToggleButton value="Best of 3">Bo3</ToggleButton>
        <ToggleButton value="Best of 5">Bo5</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
