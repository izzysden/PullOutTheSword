import { SetterOrUpdater } from "recoil";
import { LockedImg } from "../../assets/images/menu";
import LeaderboardModal from "../../components/Modal/Leaderboard";
import SettingsModal from "../../components/Modal/Settings";
import { ModalStateAtomType } from "../../atoms/modalState";
import { DropdownProps } from "../../types/dropdown";
import ManualModal from "../../components/Modal/Manual";
import { lang } from "./lang";

const language = localStorage.getItem("lang") as "en" | "ko";

export const onlineDropDown = (
  setModalState: SetterOrUpdater<ModalStateAtomType>
): DropdownProps[] => [
  {
    dropDownType: "button",
    labelText: lang[language].howToPlayDropdown,
    onClick: () =>
      setModalState({
        title: lang[language].howToPlayDropdown,
        modalContents: <ManualModal />,
      }),
  },
  {
    dropDownType: "chance",
    labelText: lang[language].setChanceDropdown,
  },
];

export const offlineDropDown = (
  setModalState: SetterOrUpdater<ModalStateAtomType>
): DropdownProps[] => [
  {
    dropDownType: "button",
    labelText: lang[language].howToPlayDropdown,
    onClick: () =>
      setModalState({
        title: lang[language].howToPlayDropdown,
        modalContents: <ManualModal />,
      }),
  },
  {
    dropDownType: "button",
    labelText: lang[language].chanceLockedDropdown,
    icon: LockedImg,
  },
];

export const leaderboardDropDown = (
  setModalState: SetterOrUpdater<ModalStateAtomType>
): DropdownProps[] => [
  {
    dropDownType: "button",
    labelText: lang[language].tppHDropdown,
    onClick: () =>
      setModalState({
        title: lang[language].leaderboardButton,
        modalContents: <LeaderboardModal tab="tppH" />,
      }),
  },
  {
    dropDownType: "button",
    labelText: lang[language].tppLDropdown,
    onClick: () =>
      setModalState({
        title: lang[language].leaderboardButton,
        modalContents: <LeaderboardModal tab="tppL" />,
      }),
  },
  {
    dropDownType: "button",
    labelText: lang[language].pullsDropdown,
    onClick: () =>
      setModalState({
        title: lang[language].leaderboardButton,
        modalContents: <LeaderboardModal tab="pulls" />,
      }),
  },
  {
    dropDownType: "button",
    labelText: lang[language].triesDropdown,
    onClick: () =>
      setModalState({
        title: lang[language].leaderboardButton,
        modalContents: <LeaderboardModal tab="tries" />,
      }),
  },
];

export const settingsDropDown = (
  setModalState: SetterOrUpdater<ModalStateAtomType>
): DropdownProps[] => [
  {
    dropDownType: "button",
    labelText: lang[language].userDropdown,
    onClick: () =>
      setModalState({
        title: lang[language].settingsButton,
        modalContents: <SettingsModal tab="user" />,
      }),
  },
  {
    dropDownType: "button",
    labelText: lang[language].generalDropdown,
    onClick: () =>
      setModalState({
        title: lang[language].settingsButton,
        modalContents: <SettingsModal tab="general" />,
      }),
  },
];
