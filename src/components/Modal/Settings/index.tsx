import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Tab from "../Tab";
import NameInput from "./NameInput";
import ReducedMotionSwitch from "./ReducedMotionSwitch";
import SfxRange from "./SfxVolumeRange";
import { SettingsTabList } from "../../../types/tab/settings";
import { TabListType } from "../../../types/tab/list";
import LangSelect from "./langSelect";
import { lang, language } from "../../../libs/constants/lang";

interface SettingsModalProps {
  tab?: SettingsTabList;
}

const SettingsModal = ({ tab }: SettingsModalProps) => {
  const [displayState, setDisplayState] = useState<SettingsTabList>("general");

  const tabList: TabListType[] = useMemo(
    () => [
      {
        id: "general",
        value: lang[language].generalDropdown,
      },
      {
        id: "user",
        value: lang[language].userDropdown,
      },
    ],
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => tab && setDisplayState(tab), []);

  return (
    <Wrapper>
      <Tab
        tabList={tabList}
        displayState={displayState}
        setDisplayState={
          setDisplayState as React.Dispatch<React.SetStateAction<string>>
        }
      />
      {displayState === "general" && (
        <ul>
          <SfxRange />
          <ReducedMotionSwitch />
          <LangSelect />
        </ul>
      )}
      {displayState === "user" && (
        <ul>
          <NameInput />
        </ul>
      )}
    </Wrapper>
  );
};

export default SettingsModal;

const Wrapper = styled.article`
  @media screen and (max-width: 900px) {
    width: 90vw;
  }

  @media screen and (min-width: 900px) {
    width: 320px;
  }

  font-size: ${({ theme }) => theme.fontSizes.text};

  ul {
    list-style: none;

    ${({ theme }) =>
      theme.animations.fadeIn + "animation: fadeIn 0.5s ease-in;"}
  }
`;
