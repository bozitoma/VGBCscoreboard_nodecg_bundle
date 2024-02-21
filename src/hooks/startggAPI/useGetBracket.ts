import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  bracketCompletedAlertAtom,
  bracketErrorAlertAtom,
  bracketLoadingAtom,
  bracketResultAtom,
  bracketStartggUrlAtom,
} from '../../store/atomBracket';
import { useGetSlug } from './useRequestQuery';

export function useGetBracket() {
  const setBracketScore = useSetRecoilState(bracketResultAtom);
  const setIsLoading = useSetRecoilState(bracketLoadingAtom);
  const setCompletedAlert = useSetRecoilState(bracketCompletedAlertAtom);
  const setErrorAlert = useSetRecoilState(bracketErrorAlertAtom);

  const url = useRecoilValue(bracketStartggUrlAtom);
  const { requestQuery } = useGetSlug();

  const phaseGroupSetsQuery = `
    query PhaseGroupSets($phaseGroupId: ID!) {
      phaseGroup(id: $phaseGroupId) {
        id
        bracketType
        sets(perPage: 50)  {
          nodes {
            id
            wPlacement
            lPlacement
            fullRoundText
            slots {
              standing {
                placement
                stats {
                  score {
                    value
                  }
                }
              }
              entrant {
                name
              }
            }
          }
        }
      }
    }`;

  // const GFBracket = ["GF", "GF2"];
  // const WFBracket = ["WF"];
  // const WSFBracket = ["WSFb", "WSFa"];
  // const WQFBracket = ["WQFd", "WQFc", "WQFb", "WQFa"];
  // const LFBracket = ["LF"];
  // const LSFBracket = ["LSF"];
  // const LQFBracket = ["LQFb", "LQFa"];
  // const LTOP8Bracket = ["LTOP8b", "LTOP8a"];
  // const LTOP16Bracket = ["LTOP16d", "LTOP16c", "LTOP16b", "LTOP16a"];

  const handleGetSets = async () => {
    // ボタンのローディング開始
    setIsLoading(true);

    try {
      const result: phaseGroupAPIResponse = await requestQuery(url, phaseGroupSetsQuery);

      const bracketType = result.data.phaseGroup.bracketType;
      const nodes = result.data.phaseGroup.sets.nodes;

      // APIの結果を格納する配列
      const GF: Array<phaseGroupNodesAPIResponse> = [];
      const WF: Array<phaseGroupNodesAPIResponse> = [];
      const WSF: Array<phaseGroupNodesAPIResponse> = [];
      const WQF: Array<phaseGroupNodesAPIResponse> = [];
      const LF: Array<phaseGroupNodesAPIResponse> = [];
      const LSF: Array<phaseGroupNodesAPIResponse> = [];
      const LQF: Array<phaseGroupNodesAPIResponse> = [];
      const LTOP8: Array<phaseGroupNodesAPIResponse> = [];
      const LTOP16: Array<phaseGroupNodesAPIResponse> = [];

      nodes.map((node) => {
        const round = node.fullRoundText;
        const wPlacement = node.wPlacement;
        const lPlacement = node.lPlacement;
        if (bracketType === 'DOUBLE_ELIMINATION') {
          if (
            //GF
            round.includes('Grand') &&
            wPlacement === 1 &&
            lPlacement === 2
          ) {
            GF.push(node);
          } else if (
            // WF
            round.includes('Winners') &&
            wPlacement === 2 &&
            lPlacement === 3
          ) {
            WF.push(node);
          } else if (
            // WS
            wPlacement === 3 &&
            lPlacement === 5
          ) {
            WSF.push(node);
          } else if (
            // WQF
            wPlacement === 5 &&
            lPlacement === 9
          ) {
            WQF.push(node);
          } else if (
            // LF
            round.includes('Losers') &&
            wPlacement === 2 &&
            lPlacement === 3
          ) {
            LF.push(node);
          } else if (
            // LSF
            wPlacement === 3 &&
            lPlacement === 4
          ) {
            LSF.push(node);
          } else if (
            // LQF
            wPlacement === 4 &&
            lPlacement === 5
          ) {
            LQF.push(node);
          } else if (
            // LTOP8
            wPlacement === 5 &&
            lPlacement === 7
          ) {
            LTOP8.push(node);
          } else if (
            // LTOP16
            wPlacement === 7 &&
            lPlacement === 9
          ) {
            LTOP16.push(node);
          }
        } else if (bracketType === 'SINGLE_ELIMINATION') {
          if (
            // 3rd Price
            wPlacement === 3 &&
            lPlacement === 4
          ) {
            GF.push(node);
          } else if (
            // Final
            wPlacement === 1 &&
            lPlacement === 2
          ) {
            WF.push(node);
          } else if (
            // Semi Final
            wPlacement === 2 &&
            lPlacement === 3
          ) {
            WSF.push(node);
          } else if (
            // Quarter Final
            wPlacement === 3 &&
            lPlacement === 5
          ) {
            WQF.push(node);
          }
        }
      });

      const applyBracket = (round: string[], array: Array<phaseGroupNodesAPIResponse>) => {
        console.log(array);
        array.sort((a, b) => a.id - b.id); //ID順にソート

        round.map((x, i) => {
          if (array[i] === undefined) {
            return;
          }
          setBracketScore((prev) => ({
            ...prev,
            [x]: {
              name1p: array[i].slots[0].entrant === null ? '' : array[i].slots[0].entrant.name,
              name2p: array[i].slots[1].entrant === null ? '' : array[i].slots[1].entrant.name,
              score1p:
                array[i].slots[0].standing === null ||
                array[i].slots[0].standing.stats.score.value === null
                  ? 0
                  : array[i].slots[0].standing.stats.score.value,
              score2p:
                array[i].slots[1].standing === null ||
                array[i].slots[1].standing.stats.score.value === null
                  ? 0
                  : array[i].slots[1].standing.stats.score.value,
            },
          }));
        });
      };

      const BracketName = [
        ['GF', 'GF2'],
        ['WF'],
        ['WSFa', 'WSFb'],
        ['WQFa', 'WQFb', 'WQFc', 'WQFd'],
        ['LF'],
        ['LSF'],
        ['LQFa', 'LQFb'],
        ['LTOP8a', 'LTOP8b'],
        ['LTOP16a', 'LTOP16b', 'LTOP16c', 'LTOP16d'],
      ];

      const APIResponseArrays = [GF, WF, WSF, WQF, LF, LSF, LQF, LTOP8, LTOP16];

      BracketName.map((barcket, i) => {
        applyBracket(barcket, APIResponseArrays[i]);
      });

      setCompletedAlert(true);
    } catch (error) {
      console.error('StartGGのAPI取得に失敗しました:', error);
      setErrorAlert(true);
    }

    // ボタンのローディング終了
    setIsLoading(false);
  };

  return { handleGetSets };
}

// ブラケットのサンプル
// "https://www.start.gg/tournament/in-4-1/event/ssqm/brackets/1525733/2296213"
// "https://www.start.gg/tournament/aim-for-the-ace-championship2023/event/64/brackets/1480645/2237087"
// "https://www.start.gg/tournament/api-test-1/event/special-1on1-ultimate-singles/brackets/1456184/2204751";
// "https://www.start.gg/tournament/aim-for-the-ace-2nd-anniversary-cup/event/mario-tennis-aces-singles-4/brackets/806437/1295426"
