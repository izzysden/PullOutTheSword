import dayjs from "dayjs";
import { atom } from "recoil";

export interface PullStateAtomType {
  pulling: boolean;
  pulled: boolean | undefined;
}

const cachedCooldown = localStorage.getItem("cooldown");
const cooldown = cachedCooldown
  ? dayjs(JSON.parse(cachedCooldown)).toDate()
  : undefined;
if (cooldown?.getTime()! <= new Date().getTime())
  localStorage.removeItem("cooldown");

export const PullStateAtom = atom<PullStateAtomType>({
  key: "pullState",
  default: {
    pulling: false,
    pulled: undefined,
  },
});
