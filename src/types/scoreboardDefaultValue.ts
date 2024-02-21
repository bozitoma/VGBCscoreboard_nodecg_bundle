import defaultImage from '../assets/melee/fox0.png';

export type PlayerValue = {
  name: string;
  team: string;
  xID: string;
  score: number;
  port: PlayerPort;
  character: CharacterValue;
};

export type CharacterValue = {
  id: number;
  name: string;
  displayName: string;
  avatarUrl: string;
};

export const characterDefaultValue: CharacterValue = {
  id: 1,
  name: 'fox0',
  avatarUrl: defaultImage,
  displayName: 'フォックス（デフォルト）',
};

export const scoreboardDefaultValue: PlayerValue = {
  name: '',
  team: '',
  xID: '',
  score: 0,
  port: 'Player1',
  character: characterDefaultValue,
};

export type PlayerPort = 'Player1' | 'Player2' | 'Player3' | 'Player4';

export type ScoreboardInfo = {
  score: number;
  TournamentName: string;
  Round: string;
  BestOf: string;
  Player1: PlayerValue;
  Player2: PlayerValue;
  Player3: PlayerValue;
  Player4: PlayerValue;
};
