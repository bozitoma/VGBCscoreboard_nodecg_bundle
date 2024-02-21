import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useGetSlug } from './useRequestQuery';
import {
  matchesAtom,
  matchesCompletedAlertAtom,
  matchesErrorAlertAtom,
  matchesLoadingAtom,
  scoreboardStartggUrlAtom,
} from '../../store/atomScoreboard';

export function useGetMatch() {
  const setMatches = useSetRecoilState(matchesAtom);
  const url = useRecoilValue(scoreboardStartggUrlAtom);
  const { requestQuery } = useGetSlug();

  // Alert類のState
  const setIsLoading = useSetRecoilState(matchesLoadingAtom);
  const setCompletedAlert = useSetRecoilState(matchesCompletedAlertAtom);
  const setErrorAlert = useSetRecoilState(matchesErrorAlertAtom);

  // stateの意味？ → 1:試合前,2:試合中,3:試合後
  const matchQuery = `
    query MatchOnTournament($eventSlug: String!) {
      event(slug: $eventSlug) {
        sets(perPage: 50, filters: {state: [1, 2], hideEmpty: true}) {
          nodes {
            id
            fullRoundText
            state
            stream {
              streamName
            }
            slots {
              entrant {
                name
                participants {
                    gamerTag
                    prefix
                    user {
                        authorizations (types: [TWITTER]) {
                        externalUsername
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;

  const handleGetMatches = async () => {
    // 初期化
    setMatches([]);

    // ボタンのローディング開始
    setIsLoading(true);

    try {
      const result = await requestQuery(url, matchQuery);
      const nodes: matchNodesAPIResponse[] = result.data.event.sets.nodes;

      const array: matchArray[] = [];

      nodes.map((node, i) => {
        const name1P =
          node.slots[0].entrant === null ? '' : node.slots[0].entrant.participants[0].gamerTag;

        const team1P =
          node.slots[0].entrant === null || node.slots[0].entrant.participants[0].prefix === null
            ? ''
            : node.slots[0].entrant.participants[0].prefix;

        const xID1P =
          node.slots[0].entrant === null ||
          node.slots[0].entrant.participants[0].user === null ||
          node.slots[0].entrant.participants[0].user.authorizations === null
            ? ''
            : `@${node.slots[0].entrant.participants[0].user.authorizations[0].externalUsername}`;

        const name2P =
          node.slots[1].entrant === null ? '' : node.slots[1].entrant.participants[0].gamerTag;

        const team2P =
          node.slots[1].entrant === null || node.slots[1].entrant.participants[0].prefix === null
            ? ''
            : node.slots[1].entrant.participants[0].prefix;

        const xID2P =
          node.slots[1].entrant === null ||
          node.slots[1].entrant.participants[0].user === null ||
          node.slots[1].entrant.participants[0].user.authorizations === null
            ? ''
            : `@${node.slots[1].entrant.participants[0].user.authorizations[0].externalUsername}`;

        const stream = node.stream === null ? '' : node.stream.streamName;
        const round = node.fullRoundText;
        const state = node.state;

        array.push({
          Player1: {
            name: name1P,
            team: team1P,
            xID: xID1P,
          },
          Player2: {
            name: name2P,
            team: team2P,
            xID: xID2P,
          },
          Round: round,
          State: state === 2 ? 'In Progress' : 'Waiting',
          Stream: stream,
          Id: i,
        });
      });

      setMatches(array);
      setCompletedAlert(true);
    } catch (error) {
      console.error('StartGGのAPI取得に失敗しました:', error);
      setErrorAlert(true);
    }

    // ボタンのローディング終了
    setIsLoading(false);
  };

  return { handleGetMatches };
}

// ブラケットのサンプル
// "https://www.start.gg/tournament/in-4-1/event/ssqm/brackets/1525733/2296213"
// "https://www.start.gg/tournament/aim-for-the-ace-championship2023/event/64/brackets/1480645/2237087"
// "https://www.start.gg/tournament/api-test-1/event/special-1on1-ultimate-singles/brackets/1456184/2204751";
// "https://www.start.gg/tournament/aim-for-the-ace-2nd-anniversary-cup/event/mario-tennis-aces-singles-4/brackets/806437/1295426"
