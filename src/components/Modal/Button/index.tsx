import styled from "styled-components";
import { lang, language } from "../../../libs/constants/lang";

interface ButtonProps {
  onClick: () => void;
}

const ModalButton = ({ onClick }: ButtonProps) => {
  return (
    <Wrapper type="button" onClick={() => onClick()}>
      {lang[language].ok}
    </Wrapper>
  );
};

export default ModalButton;

const Wrapper = styled.button`
  background-color: ${({ theme }) => theme.colors.darkTranslucent};

  margin-top: 8px;
  padding-top: 2px;
  padding-bottom: 4px;

  width: 100%;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.text};

  cursor: pointer;
  border: none;
  border-radius: 10px;
`;
