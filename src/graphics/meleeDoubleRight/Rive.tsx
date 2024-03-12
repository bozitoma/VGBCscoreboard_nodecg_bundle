import { FileAsset, decodeImage, useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';
import rivefile from '../../assets/bgw.riv';
import { useRepList } from '../../hooks/replicant/useRepList';
import { PlayerPort } from '../../types/scoreboardDefaultValue';

type Props = {
  Player1: string | undefined;
  Player2: string | undefined;
  Player3: string | undefined;
  Player4: string | undefined;
};

export const Rive = () => {
  // Rive内のキャラクターアイコンのAssetを格納するState
  const [character1pAsset, setCharacter1pAsset] = useState<FileAsset | null>(null);
  const [character2pAsset, setCharacter2pAsset] = useState<FileAsset | null>(null);
  const [character3pAsset, setCharacter3pAsset] = useState<FileAsset | null>(null);
  const [character4pAsset, setCharacter4pAsset] = useState<FileAsset | null>(null);

  // キャラクターはRiveからバリューで取得できないのでStateで管理する
  const [oldCharacter, setOldCharacter] = useState<Props>({
    Player1: '',
    Player2: '',
    Player3: '',
    Player4: '',
  });

  const { repInformation } = useRepList();

  const { rive, RiveComponent } = useRive({
    src: rivefile,
    artboard: 'DoubleRight',
    stateMachines: 'Scoreboard',
    autoplay: true,
    assetLoader: (asset, bytes) => {
      console.log({
        name: asset.name,
        fileExtension: asset.fileExtension,
        cdnUuid: asset.cdnUuid,
        isFont: asset.isFont,
        isImage: asset.isImage,
        bytes,
      });
      if (asset.name === 'character1p') {
        setCharacter1pAsset(asset);
        return true;
      } else if (asset.name === 'character2p') {
        setCharacter2pAsset(asset);
        return true;
      } else if (asset.name === 'character3p') {
        setCharacter3pAsset(asset);
        return true;
      } else if (asset.name === 'character4p') {
        setCharacter4pAsset(asset);
        return true;
      } else {
        return false;
      }
    },
  });

  const portConvert = (port: PlayerPort | undefined) => {
    let portNum = 0;
    if (port === 'Player1') {
      portNum = 1;
    } else if (port === 'Player2') {
      portNum = 2;
    } else if (port === 'Player3') {
      portNum = 3;
    } else if (port === 'Player4') {
      portNum = 4;
    }
    return portNum;
  };

  const selectCharacerIcon = (asset: FileAsset | null, img: any) => {
    if (asset) {
      fetch(img).then(async (res) => {
        const image: any = await decodeImage(new Uint8Array(await res.arrayBuffer()));
        asset.setRenderImage(image); // 型の付け方が不明
        image.unref();
      });
    }
    console.log(asset);
  };

  const Round = repInformation?.Round;
  const BestOf = repInformation?.BestOf;
  const Name1P = repInformation?.Player1.name;
  const Name2P = repInformation?.Player2.name;
  const Name3P = repInformation?.Player3.name;
  const Name4P = repInformation?.Player4.name;
  const Score1P = repInformation?.Score.Player1;
  const Score2P = repInformation?.Score.Player2;
  const Character1P = repInformation?.Player1.character.avatarUrl;
  const Character2P = repInformation?.Player2.character.avatarUrl;
  const Character3P = repInformation?.Player3.character.avatarUrl;
  const Character4P = repInformation?.Player4.character.avatarUrl;
  const Port1P = portConvert(repInformation?.Player1.port);
  const Port2P = portConvert(repInformation?.Player2.port);
  const Port3P = portConvert(repInformation?.Player3.port);
  const Port4P = portConvert(repInformation?.Player4.port);

  const oldName1P = rive?.getTextRunValue('player1Name');
  const oldName2P = rive?.getTextRunValue('player2Name');
  const oldName3P = rive?.getTextRunValue('player3Name');
  const oldName4P = rive?.getTextRunValue('player4Name');
  const oldScore1P = rive?.getTextRunValue('player1Score');
  const oldScore2P = rive?.getTextRunValue('player2Score');
  const oldRound = rive?.getTextRunValue('roundName');
  const oldBestof = rive?.getTextRunValue('bestofName');

  const isTriggerName1P = useStateMachineInput(rive, 'Scoreboard', 'name1p-update');
  const isTriggerName2P = useStateMachineInput(rive, 'Scoreboard', 'name2p-update');
  const isTriggerName3P = useStateMachineInput(rive, 'Scoreboard', 'name3p-update');
  const isTriggerName4P = useStateMachineInput(rive, 'Scoreboard', 'name4p-update');
  const isTriggerScore1P = useStateMachineInput(rive, 'Scoreboard', 'score1p-update');
  const isTriggerScore2P = useStateMachineInput(rive, 'Scoreboard', 'score2p-update');
  const isTriggerRound = useStateMachineInput(rive, 'Scoreboard', 'round-update');
  const isTriggerBestof = useStateMachineInput(rive, 'Scoreboard', 'bestof-update');
  const isTriggerPort1P = useStateMachineInput(rive, 'Scoreboard', 'port1p-update', Port1P);
  const isTriggerPort2P = useStateMachineInput(rive, 'Scoreboard', 'port2p-update', Port2P);
  const isTriggerPort3P = useStateMachineInput(rive, 'Scoreboard', 'port3p-update', Port3P);
  const isTriggerPort4P = useStateMachineInput(rive, 'Scoreboard', 'port4p-update', Port4P);
  const isTriggerChara1P = useStateMachineInput(rive, 'Scoreboard', 'chara1p-update');
  const isTriggerChara2P = useStateMachineInput(rive, 'Scoreboard', 'chara2p-update');
  const isTriggerChara3P = useStateMachineInput(rive, 'Scoreboard', 'chara3p-update');
  const isTriggerChara4P = useStateMachineInput(rive, 'Scoreboard', 'chara4p-update');

  // 最初にページを読み込んだ時にReplicantをテロップに反映させる
  useEffect(() => {
    rive?.setTextRunValue('roundName', Round !== undefined ? Round : '');
    rive?.setTextRunValue('bestofName', BestOf !== undefined ? BestOf : '');
    rive?.setTextRunValue('player1Name', Name1P !== undefined ? Name1P : '');
    rive?.setTextRunValue('player2Name', Name2P !== undefined ? Name2P : '');
    rive?.setTextRunValue('player3Name', Name3P !== undefined ? Name3P : '');
    rive?.setTextRunValue('player4Name', Name4P !== undefined ? Name4P : '');
    rive?.setTextRunValue('player1Score', String(Score1P));
    rive?.setTextRunValue('player2Score', String(Score2P));
    if (isTriggerPort1P) {
      isTriggerPort1P.value = Port1P;
    }
    if (isTriggerPort2P) {
      isTriggerPort2P.value = Port2P;
    }
    if (isTriggerPort3P) {
      isTriggerPort3P.value = Port3P;
    }
    if (isTriggerPort4P) {
      isTriggerPort4P.value = Port4P;
    }
    selectCharacerIcon(character1pAsset, Character1P);
    selectCharacerIcon(character2pAsset, Character2P);
    selectCharacerIcon(character3pAsset, Character3P);
    selectCharacerIcon(character4pAsset, Character4P);
    setOldCharacter({
      Player1: Character1P,
      Player2: Character2P,
      Player3: Character3P,
      Player4: Character4P,
    });
  }, [rive?.setTextRunValue]);

  // Replicantの更新をテロップに反映させる
  useEffect(() => {
    if (Round !== oldRound) {
      isTriggerRound?.fire();
      rive?.setTextRunValue('roundName', Round !== undefined ? Round : '');
    }
    if (BestOf !== oldBestof) {
      isTriggerBestof?.fire();
      rive?.setTextRunValue('bestofName', BestOf !== undefined ? BestOf : '');
    }
    if (Name1P !== oldName1P) {
      isTriggerName1P?.fire();
      rive?.setTextRunValue('player1Name', Name1P !== undefined ? Name1P : '');
    }
    if (Name2P !== oldName2P) {
      isTriggerName2P?.fire();
      rive?.setTextRunValue('player2Name', Name2P !== undefined ? Name2P : '');
    }
    if (Name3P !== oldName3P) {
      isTriggerName3P?.fire();
      rive?.setTextRunValue('player3Name', Name3P !== undefined ? Name3P : '');
    }
    if (Name4P !== oldName4P) {
      isTriggerName4P?.fire();
      rive?.setTextRunValue('player4Name', Name4P !== undefined ? Name4P : '');
    }
    if (Score1P !== Number(oldScore1P)) {
      isTriggerScore1P?.fire();
      rive?.setTextRunValue('player1Score', String(Score1P));
    }
    if (Score2P !== Number(oldScore2P)) {
      isTriggerScore2P?.fire();
      rive?.setTextRunValue('player2Score', String(Score2P));
    }
    if (isTriggerPort1P) {
      isTriggerPort1P.value = Port1P;
    }
    if (isTriggerPort2P) {
      isTriggerPort2P.value = Port2P;
    }
    if (isTriggerPort3P) {
      isTriggerPort3P.value = Port3P;
    }
    if (isTriggerPort4P) {
      isTriggerPort4P.value = Port4P;
    }
    if (oldCharacter.Player1 !== Character1P) {
      isTriggerChara1P?.fire();
      selectCharacerIcon(character1pAsset, Character1P);
      setOldCharacter((prev) => ({
        ...prev,
        Player1: Character1P,
      }));
    }
    if (oldCharacter.Player2 !== Character2P) {
      isTriggerChara2P?.fire();
      selectCharacerIcon(character2pAsset, Character2P);
      setOldCharacter((prev) => ({
        ...prev,
        Player2: Character2P,
      }));
    }
    if (oldCharacter.Player3 !== Character3P) {
      isTriggerChara3P?.fire();
      selectCharacerIcon(character3pAsset, Character3P);
      setOldCharacter((prev) => ({
        ...prev,
        Player3: Character3P,
      }));
    }
    if (oldCharacter.Player4 !== Character4P) {
      isTriggerChara4P?.fire();
      selectCharacerIcon(character4pAsset, Character4P);
      setOldCharacter((prev) => ({
        ...prev,
        Player4: Character4P,
      }));
    }
  }, [repInformation]);

  return (
    <>
      <>{repInformation !== undefined && <RiveComponent style={{ width: 1920, height: 1080 }} />}</>
    </>
  );
};
