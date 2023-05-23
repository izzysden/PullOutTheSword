import { useRecoilState } from "recoil";
import styled from "styled-components";
import { lang, language } from "../../../../libs/constants/lang";
import { UserLoadResponseType } from "../../../../types/user/load/response";
import { UserStateAtom } from "../../../../atoms/userState";
import { useState } from "react";
import { QueryClient } from "react-query";

const NameInput = () => {
  const username = localStorage.getItem("username");
  const [inputState, setInputState] = useState<string>(
    username ? username : ""
  );

  const [, setUserState] = useRecoilState<UserLoadResponseType>(UserStateAtom);

  const queryClient = new QueryClient();

  return (
    <Wrapper>
      <label htmlFor="username">{lang[language].yourNickname}</label>
      <input
        id="username"
        type="text"
        value={inputState}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputState(e.currentTarget.value)
        }
        onBlur={() => {
          if (inputState === "") {
            queryClient.invalidateQueries("userQuery");
            setUserState({
              username: username ? username : "",
              tries: 0,
              pulls: 0,
              cooldown: undefined,
              tpp: 0,
            });
            localStorage.removeItem("username");
          } else {
            setUserState((prevState) => {
              return { ...prevState, username: inputState };
            });
            localStorage.setItem("username", inputState);
          }
        }}
      />
      <p>{lang[language].usernameDiscretion}</p>
    </Wrapper>
  );
};

export default NameInput;

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;

  label {
    color: ${({ theme }) => theme.colors.grey};
  }

  input {
    background-color: transparent;

    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.text};

    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  }

  p {
    margin-top: 8px;

    color: ${({ theme }) => theme.colors.grey};
    font-size: ${({ theme }) => theme.fontSizes.description};
  }
`;
