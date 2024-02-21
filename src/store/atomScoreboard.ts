import { atom } from 'recoil';
import { scoreboardDefaultValue } from '../types/scoreboardDefaultValue';

export const scoreboradInfoAtom = atom({
  key: 'scoreboradInfoAtom',
  default: {
    Message: '',
    TournamentName: '',
    Round: '',
    BestOf: '',
    Player1: scoreboardDefaultValue,
    Player2: scoreboardDefaultValue,
    Player3: scoreboardDefaultValue,
    Player4: scoreboardDefaultValue,
  },
});

export const scoreboardStartggUrlAtom = atom({
  key: 'scoreboardStartggUrlAtom',
  default: '',
});

export const matchesAtom = atom<matchArray[]>({
  key: 'matchesAtom',
  default: [],
});

export const matchesSelectedRowId = atom<number | undefined>({
  key: 'matchesSelectedRowId',
  default: undefined,
});

export const matchesLoadingAtom = atom({
  key: 'matchesLoadingAtom',
  default: false,
});

export const matchesCompletedAlertAtom = atom({
  key: 'matchesCompletedAlertAtom',
  default: false,
});

export const matchesErrorAlertAtom = atom({
  key: 'matchesErrorAlertAtom',
  default: false,
});
