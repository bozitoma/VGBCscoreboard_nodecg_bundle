import { Avatar, Stack } from '@mui/material';
import { memo, useMemo } from 'react';
import Select from 'react-select';
import { scoreboradInfoAtom } from '../../../store/atomScoreboard';
import { PlayerPort } from '../../../types/scoreboardDefaultValue';
import { useRecoilState } from 'recoil';
import { characterMelee } from './ObjectCharacterSSBM';

type Props = {
  port: PlayerPort;
};

// APIのレスポンスなどを想定した、User型です
export type Character = {
  id: number;
  name: string;
  displayName: string;
  avatarUrl: string;
};

// コンポーネントのProps。初期値と選択時の関数を渡します
export type UseSelectProps = {
  selected: Character | null;
  setCharacter: (user: Character | null) => void;
};

// 選択肢を react-select にわたすための型。labelとvalueがあればよさそうですが、
// User型との相互変換のためにnameとavatarUrlも用意します。
type CharacterOption = {
  label: string;
  value: number;
  name: string;
  avatarUrl: string;
};

// Option型をUser型に変換します。react-select から渡されたデータをアプリで扱うために使います
function convertToCharacter(args: CharacterOption | null): Character | null {
  if (!args) return null;
  return {
    id: args.value,
    name: args.name,
    displayName: args.label,
    avatarUrl: args.avatarUrl,
  };
}

// User型をOption型に変換します。react-select へデータを渡すときに変換します
function convertToOption(user: Character): CharacterOption {
  return {
    label: user.displayName,
    value: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
  };
}

// 選択肢にアバター画像を表示する
const FormatOptionLabel = memo(({ option }: { option: CharacterOption }) => (
  <Stack direction="row" justifyContent="flex-start">
    <Avatar
      variant="square"
      src={option.avatarUrl}
      sx={{ width: 26, height: 26, marginRight: 1 }}
    />
    <Stack justifyContent="center">{option.label}</Stack>
  </Stack>
));

// react-select を使った、ユーザー選択コンポーネント
export const CharacertSelect = ({ port }: Props) => {
  const [scoreboradInfo, setScoreboradInfo] = useRecoilState(scoreboradInfoAtom);

  const value = useMemo(
    () => (scoreboradInfo[port].character ? convertToOption(scoreboradInfo[port].character) : null),
    [scoreboradInfo[port].character]
  );

  // 参考
  // const onChange = (newUser: CharacterOption | null) => {
  //   setCharacter(convertToUser(newUser));
  // }
  const characterSelect = (newCharacter: CharacterOption | null) => {
    setScoreboradInfo((prev) => ({
      ...prev,
      [port]: {
        ...prev[port],
        character: convertToCharacter(newCharacter),
      },
    }));
  };

  return (
    <Select
      instanceId="CharcterSelect"
      value={value} // 選択中の値
      onChange={characterSelect} // 選択されたときにはしる処理
      options={characterMelee.map(convertToOption)} // 選択肢
      formatOptionLabel={(option) => <FormatOptionLabel option={option} />}
      isClearable={true} //バツボタンを有効化
      isSearchable={true} //検索を有効化
      getOptionLabel={(option) => option.label + option.name} //検索範囲
      noOptionsMessage={() => 'Dose not exit'} //検索候補がない時のメッセージ
      placeholder="Charcter"
      components={{
        IndicatorSeparator: () => null, //デフォルトのセパレーターを消去
      }}
      styles={{
        control: (styles) => ({
          ...styles,
          width: 295,
          textAlign: 'left',
        }),
        container: (baseStyles) => ({
          ...baseStyles,
          color: 'black',
        }),
      }}
    />
  );
};
