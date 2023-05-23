import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalStateAtom, ModalStateAtomType } from "../../atoms/modalState";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";
import Button from "../Button";
import LeaderboardModal from "../Modal/Leaderboard";
import SettingsModal from "../Modal/Settings";
import StatisticsModal from "../Modal/Statistics";
import { MenuImgs } from "../../assets/images";
import {
  leaderboardDropDown,
  offlineDropDown,
  onlineDropDown,
  settingsDropDown,
} from "../../libs/constants/menuDropdown";
import { lang, language } from "../../libs/constants/lang";
import {
  SettingsStateAtom,
  SettingsStateAtomType,
} from "../../atoms/settingsState";

const Menu = () => {
  const [pullState] = useRecoilState<PullStateAtomType>(PullStateAtom);
  const [settingsState, setSettingsState] =
    useRecoilState<SettingsStateAtomType>(SettingsStateAtom);
  const [, setModalState] = useRecoilState<ModalStateAtomType>(ModalStateAtom);

  return (
    <Wrapper isReduced={settingsState.isReduced} pullState={pullState}>
      {settingsState.offlineMode ? (
        <Button
          labelText={lang[language].onlineModeButton}
          icon={MenuImgs.OnlineImg}
          onClick={() =>
            setSettingsState((prevState) => {
              return { ...prevState, offlineMode: false };
            })
          }
          dropDown={onlineDropDown(setModalState)}
        />
      ) : (
        <Button
          labelText={lang[language].offlineModeButton}
          icon={MenuImgs.OfflineImg}
          onClick={() =>
            setSettingsState((prevState) => {
              return { ...prevState, offlineMode: true };
            })
          }
          dropDown={offlineDropDown(setModalState)}
        />
      )}
      <Button
        labelText={lang[language].leaderboardButton}
        icon={MenuImgs.LeaderboardImg}
        onClick={() =>
          setModalState({
            title: lang[language].leaderboardButton,
            modalContents: <LeaderboardModal />,
          })
        }
        dropDown={leaderboardDropDown(setModalState)}
      />
      <Button
        labelText={lang[language].statisticsButton}
        icon={MenuImgs.StatisticsImg}
        onClick={() =>
          setModalState({
            title: lang[language].statisticsButton,
            modalContents: <StatisticsModal />,
          })
        }
      />
      <Button
        labelText={lang[language].settingsButton}
        icon={MenuImgs.SettingsImg}
        onClick={() =>
          setModalState({
            title: lang[language].settingsButton,
            modalContents: <SettingsModal />,
          })
        }
        dropDown={settingsDropDown(setModalState)}
      />
    </Wrapper>
  );
};

export default Menu;

interface WrapperProps {
  isReduced: boolean;
  pullState: PullStateAtomType;
}

const Wrapper = styled.nav<WrapperProps>`
  position: absolute;
  left: 50%;

  transform: translateX(-50%);

  width: 824px;

  display: flex;

  transition: opacity 1s ease;
  z-index: 2;

  @media screen and (max-width: 900px) {
    top: 120px;
    left: 120px;

    flex-direction: column;
    align-items: center;

    > div,
    > button {
      margin-top: 8px;
    }
  }

  @media screen and (min-width: 900px) {
    bottom: 50px;

    > div,
    > button {
      margin-left: 8px;
    }

    > :first-child {
      margin-left: 0;
    }
  }

  ${(props) =>
    !props.isReduced &&
    (props.pullState.pulled !== undefined || props.pullState.pulling)
      ? "opacity: 0;"
      : "opacity: 1;"};
`;
