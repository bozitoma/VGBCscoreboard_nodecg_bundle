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
            wPlacement
            lPlacement
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
        console.log(node.slots[1].entrant);

        const team1 = node.slots[0].entrant;
        const team2 = node.slots[1].entrant;

        const participants1 = team1.participants;
        const participants2 = team2.participants;

        const name1P =
          team1 === null || participants1[0].gamerTag === null ? '' : participants1[0].gamerTag;

        const team1P =
          team1 === null || participants1[0].prefix === null ? '' : participants1[0].prefix;

        const xID1P =
          team1 === null ||
          participants1[0].user === null ||
          participants1[0].user.authorizations === null
            ? ''
            : `@${participants1[0].user.authorizations[0].externalUsername}`;

        const name2P =
          team2 === null || participants2[0].gamerTag === null ? '' : participants2[0].gamerTag;

        const team2P =
          team2 === null || participants2[0].prefix === null ? '' : participants2[0].prefix;

        const xID2P =
          team2 === null ||
          participants2[0].user === null ||
          participants2[0].user.authorizations === null
            ? ''
            : `@${participants2[0].user.authorizations[0].externalUsername}`;

        // ダブルスの場合は3Pと4Pも追加

        const name3P =
          team1 === null || participants1[1] === undefined
            ? ''
            : participants1[1].gamerTag === null
            ? ''
            : participants1[1].gamerTag;

        const team3P =
          team1 === null || participants1[1] === undefined
            ? ''
            : participants1[1].prefix === null
            ? ''
            : participants1[1].prefix;

        const xID3P =
          team1 === null || participants1[1] === undefined
            ? ''
            : participants1[1].user === null || participants1[1].user.authorizations === null
            ? ''
            : `@${participants1[1].user.authorizations[0].externalUsername}`;

        const name4P =
          team2 === null || participants2[1] === undefined
            ? ''
            : participants2[1].gamerTag === null
            ? ''
            : participants2[1].gamerTag;

        const team4P =
          team2 === null || participants2[1] === undefined
            ? ''
            : participants2[1].prefix === null
            ? ''
            : participants2[1].prefix;

        const xID4P =
          team2 === null || participants2[1] === undefined
            ? ''
            : participants2[1].user === null || participants2[1].user.authorizations === null
            ? ''
            : `@${participants2[1].user.authorizations[0].externalUsername}`;

        const stream = node.stream === null ? '' : node.stream.streamName;
        const round = node.fullRoundText;
        const wPlacement = node.wPlacement;
        const lPlacement = node.lPlacement;
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
          Player3: {
            name: name3P,
            team: team3P,
            xID: xID3P,
          },
          Player4: {
            name: name4P,
            team: team4P,
            xID: xID4P,
          },
          Round: round,
          State: state === 2 ? 'In Progress' : 'Waiting',
          Stream: stream,
          Id: i,
          wPlacement: wPlacement,
          lPlacement: lPlacement,
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
