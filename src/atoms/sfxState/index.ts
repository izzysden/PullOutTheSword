import { atom } from "recoil";
import { LoseSfx, Music, PullSfx, RollSfx, WinSfx } from "../../assets/sfxes";

export interface SfxStateAtomType {
  LoseSfx: HTMLAudioElement;
  PullSfx: HTMLAudioElement;
  RollSfx: HTMLAudioElement;
  WinSfx: HTMLAudioElement;
  Music: HTMLAudioElement;
  sfxVolume: number;
  bgmVolume: number;
}

if (!localStorage.getItem("sfxVolume"))
  localStorage.setItem("sfxVolume", "0.5");
if (!localStorage.getItem("bgmVolume"))
  localStorage.setItem("bgmVolume", "0.5");
const sfxVolume = parseFloat(localStorage.getItem("sfxVolume")!);
const bgmVolume = parseFloat(localStorage.getItem("sfxVolume")!);

const lose = new Audio(LoseSfx);
lose.volume = sfxVolume;
lose.preload = "none";
const pull = new Audio(PullSfx);
pull.volume = sfxVolume;
pull.preload = "none";
const roll = new Audio(RollSfx);
roll.volume = sfxVolume;
roll.preload = "none";
const win = new Audio(WinSfx);
win.volume = sfxVolume;
win.preload = "none";
const music = new Audio(Music);
music.volume = bgmVolume;
music.loop = true;

export const SfxStateAtom = atom<SfxStateAtomType>({
  key: "sfxState",
  default: {
    LoseSfx: lose,
    PullSfx: pull,
    RollSfx: roll,
    WinSfx: win,
    Music: music,
    sfxVolume: sfxVolume,
    bgmVolume: bgmVolume,
  },
});
