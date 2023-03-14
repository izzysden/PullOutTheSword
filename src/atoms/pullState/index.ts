import { atom } from "recoil";

export interface PullStateAtomType {
  pulling: boolean;
  pulled: boolean;
}

export const PullStateAtom = atom<PullStateAtomType>({
  key: "pullState",
  default: { pulling: false, pulled: false },
});
