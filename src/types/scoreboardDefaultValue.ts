import defaultImage from '../assets/melee/fox0.png';

export type PlayerValue = {
  name: string;
  team: string;
  xID: string;
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
  port: 'Player1',
  character: characterDefaultValue,
};

export type PlayerPort = 'Player1' | 'Player2' | 'Player3' | 'Player4';
