import { atom } from "recoil";
import { bracketResultProps } from "../types/bracketResultDefaultValue";

export const bracketRoundAtom = atom({
  key: "bracketAtom",
  default: {
    WQF: "Winners Quarter",
    WSF: "Winners Semi",
    WF: "Winners Final",
    LTOP16: "Losers Top16",
    LTOP8: "Losers Top8",
    LQF: "Losers Quarter",
    LSF: "Losers Semi",
    LF: "Losers Final",
    GF: "Grand Final",
    GF2: "Grand Final set2",
  },
});

export const bracketSetsAtom = atom({
  key: "bracketSetsAtom",
  default: [],
});

const defaultValue = bracketResultProps;

export const bracketResultAtom = atom({
  key: "bracketResultAtom",
  default: {
    WQFa: defaultValue,
    WQFb: defaultValue,
    WQFc: defaultValue,
    WQFd: defaultValue,

    WSFa: defaultValue,
    WSFb: defaultValue,

    WF: defaultValue,

    LTOP16a: defaultValue,
    LTOP16b: defaultValue,
    LTOP16c: defaultValue,
    LTOP16d: defaultValue,

    LTOP8a: defaultValue,
    LTOP8b: defaultValue,

    LQFa: defaultValue,
    LQFb: defaultValue,

    LSF: defaultValue,

    LF: defaultValue,

    GF: defaultValue,
    GF2: defaultValue,
  },
});

export const bracketStartggUrlAtom = atom({
  key: "bracketStartggUrlAtom",
  default: "",
});

export const bracketLoadingAtom = atom({
  key: "bracketLoadingAtom",
  default: false,
});

export const bracketCompletedAlertAtom = atom({
  key: "bracketCompletedAlertAtom",
  default: false,
});

export const bracketErrorAlertAtom = atom({
  key: "bracketErrorAlertAtom",
  default: false,
});
