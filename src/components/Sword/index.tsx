import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DustImg, SwordImg } from "../../assets/images";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";
import {
  settingsStateAtom,
  settingsStateAtomType,
} from "../../atoms/settingsState";

const Sword = () => {
  const [pullState] = useRecoilState<PullStateAtomType>(PullStateAtom);
  const [settingsState] =
    useRecoilState<settingsStateAtomType>(settingsStateAtom);

  return (
    <>
      <Wrapper
        src={SwordImg}
        alt="Sword"
        isReduced={settingsState.isReduced}
        pulled={pullState.pulled}
        pulling={pullState.pulling}
        width="400"
        height="416"
      />
      <Dust
        src={DustImg}
        alt="Dust"
        isReduced={settingsState.isReduced}
        pulled={pullState.pulled}
        pulling={pullState.pulling}
        width="200"
        height="362"
      />
    </>
  );
};

export default Sword;

interface WrapperProps {
  isReduced: boolean;
  pulled: boolean | undefined;
  pulling: boolean;
}

const Wrapper = styled.img<WrapperProps>`
  transform: translateX(10px);

  filter: drop-shadow(0 0 8px red);

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pulling &&
      theme.animations.pull +
        theme.animations.rainbow +
        `transform: translateX(26px) translateY(-12px) rotate(3deg);
      animation: pull 4s ease-in-out, rainbow 10s linear infinite;`}

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pulled === true &&
      theme.animations.show +
        `transform: translateX(30px) translateY(-300px) rotate(180deg);
  animation: show 4s ease;`}
`;

const Dust = styled.img<WrapperProps>`
  position: absolute;
  bottom: 200px;

  transform: translateX(125px);

  visibility: hidden;

  opacity: 0;
  pointer-events: none;

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pulling &&
      theme.animations.rainbow +
        theme.animations.fadeIn +
        `animation: rainbow 10s linear infinite, fadeIn 3s linear;
  visibility: visible;
  opacity: 1;`}

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pulled !== undefined &&
      theme.animations.rainbow +
        theme.animations.fadeOut +
        `animation: rainbow 10s linear infinite, fadeOut 1s linear;`}
`;
