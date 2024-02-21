import { useReplicant } from './useReplicant';

export const useRepList = () => {
  const [repInformation, setRepInformation] = useReplicant('ScoreboardInfo');
  const [repCommentator, setRepCommentator] = useReplicant('Commentator');
  const [repBracket, setRepBracket] = useReplicant('Bracket');

  return {
    repInformation,
    setRepInformation,
    repCommentator,
    setRepCommentator,
    repBracket,
    setRepBracket,
  };
};
