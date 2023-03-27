import { atom } from "recoil";
import { UserStateAtomType } from "../userState";

export interface settingsStateAtomType {
  sfxVolume: number;
  isReduced: boolean;
  speed: number;
  user: UserStateAtomType;
}

export const settingsStateAtom = atom<settingsStateAtomType>({
  key: "settingsState",
  default: {
    sfxVolume: 0.5,
    isReduced: true,
    speed: 4,
    user: { name: "", pfp: "", timesPulled: 0 },
  },
});
