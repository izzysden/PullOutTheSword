import { useEffect, useMemo, useState } from "react";
import TopPulls from "./Pulls";
import Tab from "../Tab";
import TopTries from "./Tries";
import TppLow from "./TppLow";
import TppHigh from "./TppHigh";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { UserStateAtom } from "../../../atoms/userState";
import { LeaderboardTabList } from "../../../types/tab/leaderboard";
import { TabListType } from "../../../types/tab/list";
import { lang, language } from "../../../libs/constants/lang";
import { UserLoadResponseType } from "../../../types/user/load/response";

interface LeaderboardModalProps {
  tab?: LeaderboardTabList;
}

const LeaderboardModal = ({ tab }: LeaderboardModalProps) => {
  const [userState] = useRecoilState<UserLoadResponseType>(UserStateAtom);

  const [displayState, setDisplayState] = useState<LeaderboardTabList>("tries");

  const tabList: TabListType[] = useMemo(
    () => [
      {
        id: "tries",
        value: lang[language].triesDropdown,
      },
      {
        id: "pulls",
        value: lang[language].pullsDropdown,
      },
      {
        id: "tppL",
        value: lang[language].tppLDropdown,
      },
      {
        id: "tppH",
        value: lang[language].tppHDropdown,
      },
    ],
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => tab && setDisplayState(tab), []);

  return (
    <>
      <Tab
        tabList={tabList}
        displayState={displayState}
        setDisplayState={
          setDisplayState as React.Dispatch<React.SetStateAction<string>>
        }
      />
      <Wrapper>
        {displayState === "tries" && <TopTries user={userState} />}
        {displayState === "pulls" && <TopPulls user={userState} />}
        {displayState === "tppL" && <TppLow user={userState} />}
        {displayState === "tppH" && <TppHigh user={userState} />}
      </Wrapper>
    </>
  );
};

export default LeaderboardModal;

const Wrapper = styled.div`
  @media screen and (max-width: 900px) {
    width: 90vw;
  }

  @media screen and (min-width: 900px) {
    width: 320px;
  }

  font-size: ${({ theme }) => theme.fontSizes.text};

  ol {
    height: 400px;

    overflow-y: scroll;

    ${({ theme }) =>
      theme.animations.fadeIn + "animation: fadeIn 0.5s ease-in;"}

    .highlight {
      color: ${({ theme }) => theme.colors.subMain} !important;
      text-decoration: underline;

      ${({ theme }) =>
        theme.animations.highlight + "animation: highlight 3s ease infinite;"}
    }

    li {
      cursor: default;

      :nth-of-type(2n) {
        color: ${({ theme }) => theme.colors.grey};
      }

      :hover {
        p {
          height: 30px;
          opacity: 1;
        }
      }

      p {
        height: 0px;
        opacity: 0;

        transition: height 0.5s ease, opacity 0.25s ease;
      }
    }
  }

  > p {
    margin-top: 8px;

    border-top: 1px solid ${({ theme }) => theme.colors.white};
  }
`;
