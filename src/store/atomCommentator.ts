import { atom } from "recoil";
import { commentatorDefaultValue } from "../types/commentatorDefaultValue";

export const commentatorAtom = atom({
  key: "commentatorAtom",
  default: {
    commentator1: commentatorDefaultValue,
    commentator2: commentatorDefaultValue,
    commentator3: commentatorDefaultValue,
    commentator4: commentatorDefaultValue,
  },
});

export const commentatorSelectedRowId = atom<number | undefined>({
  key: "commentatorSelectedRowId",
  default: undefined,
});
