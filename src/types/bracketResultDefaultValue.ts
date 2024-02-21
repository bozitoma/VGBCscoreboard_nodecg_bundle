type Props = {
  name1p: string;
  name2p: string;
  score1p: number;
  score2p: number;
};

export const bracketResultProps: Props = {
  name1p: '',
  name2p: '',
  score1p: -1,
  score2p: -1,
};

export type BracketRoundList = {
  WQFa: Props;
  WQFb: Props;
  WQFc: Props;
  WQFd: Props;
  WSFa: Props;
  WSFb: Props;
  WF: Props;
  LTOP16a: Props;
  LTOP16b: Props;
  LTOP16c: Props;
  LTOP16d: Props;
  LTOP8a: Props;
  LTOP8b: Props;
  LQFa: Props;
  LQFb: Props;
  LSF: Props;
  LF: Props;
  GF: Props;
  GF2: Props;
};

export const bracketRoundText: BracketRoundText[] = [
  'WQFa',
  'WQFb',
  'WQFc',
  'WQFd',
  'WSFa',
  'WSFb',
  'WF',
  'LTOP16a',
  'LTOP16b',
  'LTOP16c',
  'LTOP16d',
  'LTOP8a',
  'LTOP8b',
  'LQFa',
  'LQFb',
  'LSF',
  'LF',
  'GF',
  'GF2',
];

export const bracketRoundName: BracketRoundName[] = [
  'WQF',
  'WSF',
  'WF',
  'LTOP16',
  'LTOP8',
  'LQF',
  'LSF',
  'LF',
  'GF',
  'GF2',
];
