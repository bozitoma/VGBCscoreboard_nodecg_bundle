import { FileAsset, decodeImage, useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';
import rivefile from '../../assets/bgw.riv';
import { useRepList } from '../../hooks/replicant/useRepList';
import { PlayerPort } from '../../types/scoreboardDefaultValue';

type Props = {
  Player1: string | undefined;
  Player2: string | undefined;
};

export const Rive = () => {
  // Rive内のキャラクターアイコンのAssetを格納するState
  const [character1pAsset, setCharacter1pAsset] = useState<FileAsset | null>(null);
  const [character2pAsset, setCharacter2pAsset] = useState<FileAsset | null>(null);

  // キャラクターはRiveからバリューで取得できないのでStateで管理する
  const [oldCharacter, setOldCharacter] = useState<Props>({
    Player1: '',
    Player2: '',
  });

  const { repInformation } = useRepList();

  const { rive, RiveComponent } = useRive({
    src: rivefile,
    artboard: 'SingleCenter',
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
  const Score1P = repInformation?.Player1.score;
  const Score2P = repInformation?.Player2.score;
  const Character1P = repInformation?.Player1.character.avatarUrl;
  const Character2P = repInformation?.Player2.character.avatarUrl;
  const Port1P = portConvert(repInformation?.Player1.port);
  const Port2P = portConvert(repInformation?.Player2.port);

  const oldName1P = rive?.getTextRunValue('player1Name');
  const oldName2P = rive?.getTextRunValue('player2Name');
  const oldScore1P = rive?.getTextRunValue('player1Score');
  const oldScore2P = rive?.getTextRunValue('player2Score');
  const oldRound = rive?.getTextRunValue('roundName');
  const oldBestof = rive?.getTextRunValue('bestofName');

  const isTriggerName1P = useStateMachineInput(rive, 'Scoreboard', 'name1p-update');
  const isTriggerName2P = useStateMachineInput(rive, 'Scoreboard', 'name2p-update');
  const isTriggerScore1P = useStateMachineInput(rive, 'Scoreboard', 'score1p-update');
  const isTriggerScore2P = useStateMachineInput(rive, 'Scoreboard', 'score2p-update');
  const isTriggerRound = useStateMachineInput(rive, 'Scoreboard', 'round-update');
  const isTriggerBestof = useStateMachineInput(rive, 'Scoreboard', 'bestof-update');
  const isTriggerPort1P = useStateMachineInput(rive, 'Scoreboard', 'port1p-update', Port1P);
  const isTriggerPort2P = useStateMachineInput(rive, 'Scoreboard', 'port2p-update', Port2P);
  const isTriggerChara1P = useStateMachineInput(rive, 'Scoreboard', 'chara1p-update');
  const isTriggerChara2P = useStateMachineInput(rive, 'Scoreboard', 'chara2p-update');

  // 最初にページを読み込んだ時にReplicantをテロップに反映させる
  useEffect(() => {
    rive?.setTextRunValue('roundName', Round !== undefined ? Round : '');
    rive?.setTextRunValue('bestofName', BestOf !== undefined ? BestOf : '');
    rive?.setTextRunValue('player1Name', Name1P !== undefined ? Name1P : '');
    rive?.setTextRunValue('player2Name', Name2P !== undefined ? Name2P : '');
    rive?.setTextRunValue('player1Score', String(Score1P));
    rive?.setTextRunValue('player2Score', String(Score2P));
    if (isTriggerPort1P) {
      isTriggerPort1P.value = Port1P;
    }
    if (isTriggerPort2P) {
      isTriggerPort2P.value = Port2P;
    }
    selectCharacerIcon(character1pAsset, Character1P);
    selectCharacerIcon(character2pAsset, Character2P);
    setOldCharacter({
      Player1: Character1P,
      Player2: Character2P,
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
  }, [repInformation]);

  return (
    <>
      <>{repInformation !== undefined && <RiveComponent style={{ width: 1920, height: 1080 }} />}</>
    </>
  );
};
