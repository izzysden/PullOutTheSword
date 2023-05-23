import { useRecoilState } from "recoil";
import { ModalStateAtom, ModalStateAtomType } from "./atoms/modalState";
import Header from "./components/Header";
import Landscape from "./components/Landscape";
import ModalFrame from "./components/Modal";
import Stone from "./components/Stone";
import Sword from "./components/Sword";
import Wrapper from "./components/Wrapper";
import Menu from "./components/Menu";
import { UserLoadResponseType } from "./types/user/load/response";
import { UserStateAtom } from "./atoms/userState";
import useStatistics from "./hooks/useStatistics";
import { useEffect } from "react";
import { SfxStateAtom, SfxStateAtomType } from "./atoms/sfxState";

function App() {
  const [sfxState] = useRecoilState<SfxStateAtomType>(SfxStateAtom);
  const [modalState] = useRecoilState<ModalStateAtomType>(ModalStateAtom);
  const [userState, setUserState] =
    useRecoilState<UserLoadResponseType>(UserStateAtom);

  const statisticsQuery = useStatistics(userState.username);

  useEffect(() => {
    const onFirstJoin = () => {
      sfxState.Music.play();
      if (sfxState.Music.currentTime > 0)
        window.removeEventListener("mousemove", onFirstJoin);
    };
    window.addEventListener("mousemove", onFirstJoin);
    return () => {
      window.removeEventListener("mousemove", onFirstJoin);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statisticsQuery.data && statisticsQuery.isStale === false)
      setUserState(statisticsQuery.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statisticsQuery.data, statisticsQuery.isStale]);

  return (
    <>
      {modalState.title !== "" && (
        <ModalFrame title={modalState.title}>
          {modalState.modalContents}
        </ModalFrame>
      )}
      <Header />
      <Landscape />
      <Wrapper>
        <Sword />
        <Stone />
      </Wrapper>
      <Menu />
    </>
  );
}

export default App;
