import { useRecoilState, useRecoilValue } from 'recoil';
import { commentatorAtom, commentatorSelectedRowId } from '../store/atomCommentator';
import { useSpreadSheetAPI } from './useSpreadSheetAPI';
import { CommentatorText } from '../types/commentatorDefaultValue';

export const useCommentator = () => {
  const selectedRowId = useRecoilValue(commentatorSelectedRowId);
  const [commentatorInfo, setCommentatorInfo] = useRecoilState(commentatorAtom);
  const { spreadSheetAPI } = useSpreadSheetAPI();

  const commentatorSwap = (swap1: CommentatorText, swap2: CommentatorText) => {
    setCommentatorInfo((prev) => ({
      ...prev,
      [swap1]: {
        name: commentatorInfo[swap2].name,
        account: commentatorInfo[swap2].account,
        tag: commentatorInfo[swap2].tag,
      },
      [swap2]: {
        name: commentatorInfo[swap1].name,
        account: commentatorInfo[swap1].account,
        tag: commentatorInfo[swap1].tag,
      },
    }));
  };

  const commentatorSubmit = (commentator: string) => {
    setCommentatorInfo((prev) => ({
      ...prev,
      [commentator]: {
        name: spreadSheetAPI[selectedRowId || 0].name,
        account: spreadSheetAPI[selectedRowId || 0].account,
        tag: spreadSheetAPI[selectedRowId || 0].tag,
      },
    }));
  };

  return {
    commentatorSwap,
    commentatorSubmit,
  };
};
