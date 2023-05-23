import styled from "styled-components";
import { MenuImgs } from "../../assets/images";
import { useMemo, useState } from "react";
import Dropdown from "../Dropdown";
import { DropdownProps } from "../../types/dropdown";
import { lang, language } from "../../libs/constants/lang";

interface ButtonProps {
  labelText: string;
  icon: string;
  onClick?: () => void;
  dropDown?: DropdownProps[];
}

const Button = ({ labelText, icon, onClick, dropDown }: ButtonProps) => {
  const [dropdownState, setDropdownState] = useState<boolean | "focus">(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buttonId = useMemo(() => labelText.split(" ")[0].toLowerCase(), []);

  return dropDown ? (
    <div
      onMouseEnter={() => dropDown && setDropdownState(true)}
      onMouseLeave={() =>
        dropDown && dropdownState !== "focus" && setDropdownState(false)
      }
    >
      <Dropdowns dropdownState={dropdownState as boolean} labelText={labelText}>
        {dropDown.map((v, i) => (
          <li key={`${buttonId}${i}`}>
            <Dropdown
              dropDownType={v.dropDownType}
              labelText={v.labelText}
              icon={v.icon}
              onClick={v.onClick}
              setDropdownState={
                labelText === lang[language].onlineModeButton ||
                labelText === lang[language].offlineModeButton
                  ? setDropdownState
                  : undefined
              }
            />
          </li>
        ))}
      </Dropdowns>
      <Wrapper type="button" onClick={onClick}>
        {icon && <img src={icon} alt="" />}
        {labelText}
      </Wrapper>
    </div>
  ) : (
    <Wrapper type="button" onClick={onClick}>
      {icon && <img src={icon} alt="" />}
      {labelText}
    </Wrapper>
  );
};

export default Button;

interface DropdownsProps {
  dropdownState: boolean;
  labelText: string;
}

const Dropdowns = styled.ul<DropdownsProps>`
  position: absolute;

  display: flex;
  flex-direction: column;

  transition: clip 0.25s ease, opacity 0.5s ease;
  will-change: clip, opacity;

  @media screen and (max-width: 900px) {
    left: 530px;

    display: none;

    ${(props) =>
      (props.labelText === lang[language].offlineModeButton ||
        props.labelText === lang[language].onlineModeButton) &&
      `display: flex;
  flex-direction: column;`}

    ${(props) =>
      props.dropdownState
        ? "clip: rect(auto, auto, 15rem, auto); opacity: 1;"
        : "clip: rect(auto, auto, 0, auto); opacity: 0;"}
  }

  @media screen and (min-width: 900px) {
    bottom: 45px;

    ${(props) =>
      props.dropdownState
        ? "clip: rect(0, auto, auto, auto); opacity: 1;"
        : "clip: rect(15rem, auto, auto, auto); opacity: 0;"}
  }

  button,
  fieldset {
    margin-bottom: 8px;
  }
`;

const Wrapper = styled.button`
  background-color: transparent;
  background-image: url(${MenuImgs.ButtonImg});

  padding: 8px;
  padding-left: 16px;

  width: 200px;
  height: 48px;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.text};

  cursor: pointer;
  border: none;
  border-radius: 10px;
  transition: color 0.25s ease;

  :hover {
    color: ${({ theme }) => theme.colors.white};

    img {
      filter: invert(1);
    }
  }

  img {
    margin-right: 8px;

    filter: invert(0);

    transition: filter 0.25s ease;
    will-change: filter;
  }
`;
