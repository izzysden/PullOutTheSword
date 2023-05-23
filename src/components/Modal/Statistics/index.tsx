import { useRecoilState } from "recoil";
import styled from "styled-components";
import { UserStateAtom } from "../../../atoms/userState";
import { lang, language } from "../../../libs/constants/lang";
import { UserLoadResponseType } from "../../../types/user/load/response";

const StatisticsModal = () => {
  const [userState] = useRecoilState<UserLoadResponseType>(UserStateAtom);

  return (
    <Wrapper>
      <ul>
        <li>{`${lang[language].statistics1}: ${
          userState.username ? userState.username : lang[language].na
        }`}</li>
        <li>{`${lang[language].statistics2}: ${userState.tries}`}</li>
        <li>{`${lang[language].statistics3}: ${userState.pulls}`}</li>
        <li>
          {`${lang[language].statistics4}: 
          ${
            userState.pulls > 0
              ? (userState.tries / userState.pulls).toFixed(2)
              : lang[language].na
          }`}
        </li>
      </ul>
    </Wrapper>
  );
};

export default StatisticsModal;

const Wrapper = styled.div`
  margin-top: 8px;

  @media screen and (max-width: 900px) {
    width: 90vw;
  }

  @media screen and (min-width: 900px) {
    width: 320px;
  }

  font-size: ${({ theme }) => theme.fontSizes.text};

  border-top: 1px solid ${({ theme }) => theme.colors.white};

  ul {
    list-style: none;

    ${({ theme }) =>
      theme.animations.fadeIn + "animation: fadeIn 0.5s ease-in;"}
  }
`;
