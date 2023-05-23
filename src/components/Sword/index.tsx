import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";

import { SwordImgs } from "../../assets/images";
import { lang, language } from "../../libs/constants/lang";
import {
  SettingsStateAtom,
  SettingsStateAtomType,
} from "../../atoms/settingsState";

const Sword = () => {
  const [pullState] = useRecoilState<PullStateAtomType>(PullStateAtom);
  const [settingsState] =
    useRecoilState<SettingsStateAtomType>(SettingsStateAtom);
  return (
    <>
      <Wrapper
        src={SwordImgs.SwordImg}
        alt={lang[language].sword}
        isReduced={settingsState.isReduced}
        pullState={pullState}
        width="400"
        height="416"
      />
      <Dust
        aria-hidden="true"
        src={SwordImgs.DustImg}
        alt={lang[language].dust}
        isReduced={settingsState.isReduced}
        pullState={pullState}
        width="200"
        height="362"
      />
    </>
  );
};

export default Sword;

interface IWrapperProps {
  isReduced: boolean;
  pullState: PullStateAtomType;
}
const Wrapper = styled.img<IWrapperProps>`
  transform: translateX(10px);

  filter: drop-shadow(0 0 8px red);

  ${(props) => !props.isReduced && "will-change: transform, filter;"}

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pullState.pulling &&
      theme.animations.pull +
        theme.animations.rainbow +
        `transform: translateX(26px) translateY(-12px) rotate(3deg);
      animation: pull 4s ease-in-out, rainbow 10s linear infinite;`}

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pullState.pulled === true &&
      theme.animations.show +
        `transform: translateX(30px) translateY(-300px) rotate(180deg);
  animation: show 4s ease;`}
`;
const Dust = styled.img<IWrapperProps>`
  position: absolute;
  bottom: 200px;

  transform: translateX(20px);

  visibility: hidden;

  opacity: 0;
  pointer-events: none;

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pullState.pulling &&
      theme.animations.rainbow +
        theme.animations.fadeIn +
        `animation: rainbow 10s linear infinite, fadeIn 3s linear;
  visibility: visible;
  opacity: 1;`}

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pullState.pulled !== undefined &&
      theme.animations.rainbow +
        theme.animations.fadeOut +
        `animation: rainbow 10s linear infinite, fadeOut 1s linear;`}
`;
