import { PlayerPort } from './scoreboardDefaultValue';

// 各項目の初期値
export type Player = {
  name: string;
  team: string;
  xID: string;
  score: number;
  port: PlayerPort;
  character: Character;
};

export type Character = {
  id: number;
  name: string;
  displayName: string;
  avatarUrl: string;
};

export const characterDefaultValue: Character = {
  id: 0,
  name: '',
  avatarUrl: '',
  displayName: '',
};

export const playerDefaultValues: Player = {
  name: 'name',
  team: 'team',
  xID: '@ID',
  score: 0,
  port: 'Player1',
  character: characterDefaultValue,
};

export type Commentator = {
  name: string;
  account: string;
  tag: string;
};

export const commentatorDefaultValues: Commentator = {
  name: 'name',
  account: 'account',
  tag: 'tag',
};

export type Bracket = {
  name1p: string;
  name2p: string;
  score1p: number;
  score2p: number;
};

export const bracketDefaultValues: Bracket = {
  name1p: 'name1p',
  name2p: 'name2p',
  score1p: 0,
  score2p: 0,
};

// Replicantsの型を定義
export type ReplicantMap = {
  ScoreboardInfo: {
    Message: string;
    TournamentName: string;
    Round: string;
    BestOf: string;
    Player1: Player;
    Player2: Player;
    Player3: Player;
    Player4: Player;
  };
  Commentator: {
    commentator1: Commentator;
    commentator2: Commentator;
    commentator3: Commentator;
    commentator4: Commentator;
  };
  Bracket: {
    WQFa: Bracket;
    WQFb: Bracket;
    WQFc: Bracket;
    WQFd: Bracket;
    WSFa: Bracket;
    WSFb: Bracket;
    WF: Bracket;
    LTOP16a: Bracket;
    LTOP16b: Bracket;
    LTOP16c: Bracket;
    LTOP16d: Bracket;
    LTOP8a: Bracket;
    LTOP8b: Bracket;
    LQFa: Bracket;
    LQFb: Bracket;
    LSF: Bracket;
    LF: Bracket;
    GF: Bracket;
    GF2: Bracket;
    BracketRound: {
      WQF: string;
      WSF: string;
      WF: string;
      LTOP16: string;
      LTOP8: string;
      LQF: string;
      LSF: string;
      LF: string;
      GF: string;
      GF2: string;
    };
  };
};

// Replicantsの初期値を定義
export const replicantDefaultValues: ReplicantMap = {
  ScoreboardInfo: {
    Message: 'Message',
    TournamentName: 'TournamentName',
    Round: 'Round',
    BestOf: 'BestOf',
    Player1: playerDefaultValues,
    Player2: playerDefaultValues,
    Player3: playerDefaultValues,
    Player4: playerDefaultValues,
  },
  Commentator: {
    commentator1: commentatorDefaultValues,
    commentator2: commentatorDefaultValues,
    commentator3: commentatorDefaultValues,
    commentator4: commentatorDefaultValues,
  },
  Bracket: {
    WQFa: bracketDefaultValues,
    WQFb: bracketDefaultValues,
    WQFc: bracketDefaultValues,
    WQFd: bracketDefaultValues,
    WSFa: bracketDefaultValues,
    WSFb: bracketDefaultValues,
    WF: bracketDefaultValues,
    LTOP16a: bracketDefaultValues,
    LTOP16b: bracketDefaultValues,
    LTOP16c: bracketDefaultValues,
    LTOP16d: bracketDefaultValues,
    LTOP8a: bracketDefaultValues,
    LTOP8b: bracketDefaultValues,
    LQFa: bracketDefaultValues,
    LQFb: bracketDefaultValues,
    LSF: bracketDefaultValues,
    LF: bracketDefaultValues,
    GF: bracketDefaultValues,
    GF2: bracketDefaultValues,
    BracketRound: {
      WQF: 'Winners Quarter',
      WSF: 'Winners Semi',
      WF: 'Winners Final',
      LTOP16: 'Losers Top16',
      LTOP8: 'Losers Top8',
      LQF: 'Losers Quarter',
      LSF: 'Losers Semi',
      LF: 'Losers Final',
      GF: 'Grand Final',
      GF2: 'Grand Final set2',
    },
  },
};
