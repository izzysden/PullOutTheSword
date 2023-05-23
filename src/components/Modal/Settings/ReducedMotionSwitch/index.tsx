import { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { MenuImgs } from "../../../../assets/images";
import { lang, language } from "../../../../libs/constants/lang";
import {
  SettingsStateAtom,
  SettingsStateAtomType,
} from "../../../../atoms/settingsState";

const ReducedMotionSwitch = () => {
  const [settingsState, setSettingsState] =
    useRecoilState<SettingsStateAtomType>(SettingsStateAtom);
  const reducedMotionSwitchRef = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <img src={MenuImgs.EffectImg} alt="" />
      <p>{lang[language].reducedMotion}</p>
      <Checkbox
        id="reducedMotion"
        type="checkbox"
        defaultChecked={settingsState.isReduced}
        ref={reducedMotionSwitchRef}
      />
      <Label
        htmlFor="reducedMotion"
        onClick={() => {
          setSettingsState((prevState) => {
            return {
              ...prevState,
              isReduced: !reducedMotionSwitchRef.current?.checked,
            };
          });
          localStorage.setItem(
            "isReduced",
            JSON.stringify(!reducedMotionSwitchRef.current?.checked)
          );
        }}
      >
        <Button isReduced={settingsState.isReduced} />
      </Label>
    </Wrapper>
  );
};

export default ReducedMotionSwitch;

const Wrapper = styled.div`
  margin-top: 8px;

  display: flex;
  align-items: center;

  img,
  p {
    margin-right: 8px;
  }
`;

const Label = styled.label`
  background-color: ${({ theme }) => theme.colors.lightTranslucent};

  width: 48px;
  height: 16px;

  display: flex;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  transition: opacity 0.25s ease;
  opacity: 0.75;

  :hover {
    opacity: 1;
  }
`;

interface ButtonProps {
  isReduced: boolean;
}

const Button = styled.span<ButtonProps>`
  position: absolute;

  background-color: ${({ theme }) => theme.colors.white};

  ${(props) =>
    props.isReduced
      ? "transform: translateX(24px);"
      : "transform: translateX(-4px);"}

  width: 24px;
  height: 24px;

  cursor: pointer;
  border: 0.1vh solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  transition: transform 0.25s ease;
`;

const Checkbox = styled.input`
  position: absolute;

  appearance: none;
`;
