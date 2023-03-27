import { atom } from "recoil";

export interface PullStateAtomType {
  pulling: boolean;
  pulled: boolean | undefined;
}

export const PullStateAtom = atom<PullStateAtomType>({
  key: "pullState",
  default: { pulling: false, pulled: undefined },
});
