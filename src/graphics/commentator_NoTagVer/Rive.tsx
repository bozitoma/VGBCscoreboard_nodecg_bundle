import {
  useRive,
  useStateMachineInput,
  EventType,
  EventCallback,
  RiveEventPayload,
} from '@rive-app/react-canvas';
import { useEffect } from 'react';
import rivefile from '../../assets/vgbc.riv';
import { useRepList } from '../../hooks/replicant/useRepList';
import { CommentatorText } from '../../types/commentatorDefaultValue';

type CommentatorNum = 1 | 2 | 3 | 4;
const commentatorNum: CommentatorNum[] = [1, 2, 3, 4];

export const Rive = () => {
  const { repCommentator } = useRepList();

  const { rive, RiveComponent } = useRive({
    src: rivefile,
    artboard: 'TelopNoTags',
    stateMachines: 'Telop',
    autoplay: true,
  });

  const Name1 = repCommentator?.commentator1.name;
  const Account1 = repCommentator?.commentator1.account;
  const Name2 = repCommentator?.commentator2.name;
  const Account2 = repCommentator?.commentator2.account;
  const Name3 = repCommentator?.commentator3.name;
  const Account3 = repCommentator?.commentator3.account;
  const Name4 = repCommentator?.commentator4.name;
  const Account4 = repCommentator?.commentator4.account;

  const oldName1 = rive?.getTextRunValue('name1');
  const oldAccount1 = rive?.getTextRunValue('xID1');
  const oldName2 = rive?.getTextRunValue('name2');
  const oldAccount2 = rive?.getTextRunValue('xID2');
  const oldName3 = rive?.getTextRunValue('name3');
  const oldAccount3 = rive?.getTextRunValue('xID3');
  const oldName4 = rive?.getTextRunValue('name4');
  const oldAccount4 = rive?.getTextRunValue('xID4');

  const isTriggerInput1 = useStateMachineInput(rive, 'Telop', 'fadeTrigger1');
  const isTriggerInput2 = useStateMachineInput(rive, 'Telop', 'fadeTrigger2');
  const isTriggerInput3 = useStateMachineInput(rive, 'Telop', 'fadeTrigger3');
  const isTriggerInput4 = useStateMachineInput(rive, 'Telop', 'fadeTrigger4');

  // 最初にページを読み込んだ時にReplicantをテロップに反映させる
  useEffect(() => {
    if (repCommentator !== undefined) {
      commentatorNum.map((num) => {
        // newValueを定義
        const commentator: CommentatorText = `commentator${num}`;
        const name = repCommentator[commentator].name;
        const account = repCommentator[commentator].account;

        rive?.setTextRunValue(`name${num}`, name !== undefined ? name : '');
        rive?.setTextRunValue(`xID${num}`, account !== undefined ? account : '');
      });
    }
  }, [rive?.setTextRunValue]);

  const repInputRiveValue = (num: CommentatorNum) => {
    if (repCommentator !== undefined) {
      // newValueを定義
      const commentatorNum: CommentatorText = `commentator${num}`;
      const name = repCommentator[commentatorNum].name;
      const account = repCommentator[commentatorNum].account;

      rive?.setTextRunValue(`name${num}`, name !== undefined ? name : '');
      rive?.setTextRunValue(`xID${num}`, account !== undefined ? account : '');
    }
  };

  // Riveのeventを読み込む関数
  const onRiveEventReceived: EventCallback = (riveEvent) => {
    const eventData = riveEvent.data as RiveEventPayload;
    switch (eventData?.name) {
      case 'setTelop1':
        repInputRiveValue(1);
        break;
      case 'setTelop2':
        repInputRiveValue(2);
        break;
      case 'setTelop3':
        repInputRiveValue(3);
        break;
      case 'setTelop4':
        repInputRiveValue(4);
        break;
    }
  };

  // Replicantの更新をテロップに反映させる
  useEffect(() => {
    if (Name1 !== oldName1 || Account1 !== oldAccount1) {
      isTriggerInput1?.fire();
    }
    if (Name2 !== oldName2 || Account2 !== oldAccount2) {
      isTriggerInput2?.fire();
    }
    if (Name3 !== oldName3 || Account3 !== oldAccount3) {
      isTriggerInput3?.fire();
    }
    if (Name4 !== oldName4 || Account4 !== oldAccount4) {
      isTriggerInput4?.fire();
    }
    rive?.on(EventType.RiveEvent, onRiveEventReceived);
  }, [repCommentator]);

  return (
    <>{repCommentator !== undefined && <RiveComponent style={{ width: 1920, height: 1080 }} />}</>
  );
};
