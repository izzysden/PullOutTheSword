import { atom } from "recoil";
import { LoseSfx, PullSfx, RollSfx, WinSfx } from "../../assets/sfxes";

export interface SfxStateAtomType {
  LoseSfx: HTMLAudioElement;
  PullSfx: HTMLAudioElement;
  RollSfx: HTMLAudioElement;
  WinSfx: HTMLAudioElement;
  volume: number;
}

const sfxVolume = localStorage.getItem("sfxVolume");
const volume: number = sfxVolume ? parseFloat(sfxVolume) : 0.5;

const lose = new Audio(LoseSfx);
lose.volume = volume;
lose.preload = "none";
const pull = new Audio(PullSfx);
pull.volume = volume;
pull.preload = "none";
const roll = new Audio(RollSfx);
roll.volume = volume;
roll.preload = "none";
const win = new Audio(WinSfx);
win.volume = volume;
win.preload = "none";

export const SfxStateAtom = atom<SfxStateAtomType>({
  key: "sfxState",
  default: {
    LoseSfx: lose,
    PullSfx: pull,
    RollSfx: roll,
    WinSfx: win,
    volume: volume,
  },
});
