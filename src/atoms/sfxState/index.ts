import { atom } from "recoil";
import { LoseSfx, PullSfx, RollSfx, WinSfx } from "../../assets/sfxes";

export interface SfxStateAtomType {
  LoseSfx: HTMLAudioElement;
  PullSfx: HTMLAudioElement;
  RollSfx: HTMLAudioElement;
  WinSfx: HTMLAudioElement;
}

export const SfxStateAtom = atom<SfxStateAtomType>({
  key: "sfxState",
  default: {
    LoseSfx: new Audio(LoseSfx),
    PullSfx: new Audio(PullSfx),
    RollSfx: new Audio(RollSfx),
    WinSfx: new Audio(WinSfx),
  },
});
