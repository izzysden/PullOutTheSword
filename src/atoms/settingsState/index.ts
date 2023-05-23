import { atom } from "recoil";

export interface SettingsStateAtomType {
  isReduced: boolean;
  offlineMode: boolean;
  chance: number | "";
  language: "en" | "ko";
}

if (!localStorage.getItem("isReduced"))
  localStorage.setItem(
    "isReduced",
    JSON.stringify(
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true
    )
  );
const isReduced = localStorage.getItem("isReduced")?.toLowerCase() === "true";

if (!localStorage.getItem("lang"))
  if (window.navigator.language.includes("ko"))
    localStorage.setItem("lang", "ko");
  else localStorage.setItem("lang", "en");
const lang = localStorage.getItem("lang") as "en" | "ko";

export const SettingsStateAtom = atom<SettingsStateAtomType>({
  key: "settingsState",
  default: {
    isReduced: isReduced,
    offlineMode: false,
    chance: 1,
    language: lang,
  },
});
