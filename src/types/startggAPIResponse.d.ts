type phaseGroupAPIResponse = {
  data: {
    phaseGroup: {
      bracketType: string;
      id: number;
      sets: {
        nodes: Array<phaseGroupNodesAPIResponse>;
      };
    };
  };
};

type phaseGroupNodesAPIResponse = {
  fullRoundText: string;
  wPlacement: number;
  lPlacement: number;
  id: number;
  slots: Array<{
    entrant: {
      name: string;
    };
    standing: {
      placement: number;
      stats: {
        score: {
          value: number;
        };
      };
    };
  }>;
};

type matchAPIResponse = {
  data: {
    phaseGroup: {
      sets: {
        nodes: Array<matchNodesAPIResponse>;
      };
    };
  };
};

type matchNodesAPIResponse = {
  id: number;
  wPlacement: number;
  lPlacement: number;
  fullRoundText: string;
  state: number;
  stream: {
    streamName: string;
  };
  slots: Array<{
    entrant: {
      name: string;
      participants: Array<{
        gamerTag: string;
        prefix: string;
        user: {
          authorizations: Array<{
            externalUsername: string;
          }>;
        };
      }>;
    };
  }>;
};

// Matchを格納するための配列
type matchArray = {
  Player1: matchPlayerInfo;
  Player2: matchPlayerInfo;
  Player3: matchPlayerInfo;
  Player4: matchPlayerInfo;
  Round: string;
  State: 'In Progress' | 'Waiting';
  Stream: string;
  Id: number;
  wPlacement: number;
  lPlacement: number;
};

type matchPlayerInfo = {
  name: string;
  team: string;
  xID: string;
};
