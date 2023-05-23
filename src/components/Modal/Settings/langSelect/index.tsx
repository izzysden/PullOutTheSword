import { useRecoilState } from "recoil";
import styled from "styled-components";
import { MenuImgs } from "../../../../assets/images";
import { lang, language } from "../../../../libs/constants/lang";
import {
  SettingsStateAtom,
  SettingsStateAtomType,
} from "../../../../atoms/settingsState";

const LangSelect = () => {
  const [settingsState] =
    useRecoilState<SettingsStateAtomType>(SettingsStateAtom);

  return (
    <Wrapper>
      <img src={MenuImgs.LanguageImg} alt="" />
      <p>{lang[language].language}: </p>
      <Select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          localStorage.setItem("lang", e.currentTarget.value);
          window.location.reload();
        }}
        defaultValue={settingsState.language}
      >
        <option value="en">{lang[language].english}</option>
        <option value="ko">{lang[language].korean}</option>
      </Select>
    </Wrapper>
  );
};

export default LangSelect;

const Wrapper = styled.div`
  margin-top: 8px;

  display: flex;
  align-items: center;

  img,
  p {
    margin-right: 8px;
  }

  p {
    min-width: max-content;
  }
`;

const Select = styled.select`
  background-color: ${({ theme }) => theme.colors.lightTranslucent};

  width: 100%;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.text};

  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  transition: opacity 0.25s ease;
  opacity: 0.75;

  :hover,
  :focus {
    opacity: 1;
  }

  option {
    color: ${({ theme }) => theme.colors.black};
  }
`;
