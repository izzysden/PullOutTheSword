import { useEffect, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { PullStateAtom, PullStateAtomType } from "./atoms/pullState";
import {
  settingsStateAtom,
  settingsStateAtomType,
} from "./atoms/settingsState";
import { SfxStateAtom, SfxStateAtomType } from "./atoms/sfxState";
import Header from "./components/Header";
import Landscape from "./components/Landscape";
import Stone from "./components/Stone";
import Sword from "./components/Sword";
import Wrapper from "./components/Wrapper";

function App() {
  const [pullState, setPullState] =
    useRecoilState<PullStateAtomType>(PullStateAtom);
  const [settingsState, setSettingsState] =
    useRecoilState<settingsStateAtomType>(settingsStateAtom);
  const [sfxState, setSfxState] =
    useRecoilState<SfxStateAtomType>(SfxStateAtom);

  useLayoutEffect(() => {
    const temp = Object.assign({}, sfxState);
    temp.LoseSfx.volume = settingsState.sfxVolume;
    temp.LoseSfx.preload = "none";
    temp.PullSfx.volume = settingsState.sfxVolume;
    temp.PullSfx.preload = "none";
    temp.RollSfx.volume = settingsState.sfxVolume;
    temp.RollSfx.preload = "none";
    temp.WinSfx.volume = settingsState.sfxVolume;
    temp.WinSfx.preload = "none";
    setSfxState(temp);
    const isReduced =
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    setSettingsState((prevState) => {
      return { ...prevState, isReduced: isReduced };
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pullState.pulling) {
      setTimeout(() => sfxState.RollSfx.play(), 250);
      setTimeout(() => {
        const chance = Math.floor(Math.random() * 100);
        console.log(chance);
        if (!chance) setPullState({ pulling: false, pulled: true });
        else setPullState({ pulling: false, pulled: false });
      }, 4000);
    }
    if (pullState.pulled !== undefined) {
      if (pullState.pulled === true) {
        setTimeout(() => sfxState.PullSfx.play(), 750);
        setTimeout(() => sfxState.WinSfx.play(), 1750);
      }
      if (pullState.pulled === false) {
        setTimeout(() => sfxState.LoseSfx.play(), 750);
        setTimeout(
          () =>
            setPullState((prevState) => {
              return { ...prevState, pulled: undefined };
            }),
          1750
        );
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pullState]);

  return (
    <>
      <Header />
      <Landscape />
      <Wrapper>
        <Sword />
        <Stone />
      </Wrapper>
    </>
  );
}

export default App;
