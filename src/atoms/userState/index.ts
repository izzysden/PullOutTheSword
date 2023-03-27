import { atom } from "recoil";

export interface UserStateAtomType {
  name: string;
  pfp: string;
  timesPulled: number;
}

export const UserStateAtom = atom<UserStateAtomType>({
  key: "userState",
  default: { name: "", pfp: "", timesPulled: 0 },
});
