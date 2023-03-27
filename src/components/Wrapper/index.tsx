import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";
import {
  settingsStateAtom,
  settingsStateAtomType,
} from "../../atoms/settingsState";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: WrapperProps) => {
  const [pullState, setPullState] =
    useRecoilState<PullStateAtomType>(PullStateAtom);
  const [settingsState] =
    useRecoilState<settingsStateAtomType>(settingsStateAtom);

  return (
    <>
      <Filter
        isReduced={settingsState.isReduced}
        pulled={pullState.pulled}
        pulling={pullState.pulling}
      />
      <Click
        isReduced={settingsState.isReduced}
        pulled={pullState.pulled}
        pulling={pullState.pulling}
        onClick={() => {
          if (!pullState.pulling && pullState.pulled === undefined)
            setPullState((prevState) => {
              return { ...prevState, pulling: true };
            });
        }}
      >
        {children}
      </Click>
    </>
  );
};

export default Wrapper;

interface ClickProps {
  isReduced: boolean;
  pulled: boolean | undefined;
  pulling: boolean;
}

const Filter = styled.div<ClickProps>`
  position: absolute;
  top: 0;

  background-color: white;

  width: 100vw;
  height: 100vh;

  visibility: hidden;

  opacity: 0;
  z-index: 99;

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pulling &&
      theme.animations.fadeIn +
        `animation: fadeIn 4s linear;
  visibility: visible;
  opacity: 1;`}

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pulled !== undefined &&
      theme.animations.fadeOut + `animation: fadeOut 1s linear;`}
`;

const Click = styled.article<ClickProps>`
  position: absolute;
  left: calc(50vw - 220px);
  bottom: 0;

  display: flex;
  align-items: flex-end;

  ${(props) =>
    !props.pulling &&
    props.pulled === undefined &&
    `cursor: pointer;
  transition: filter 0.25s ease;
  
  :hover {
    filter: brightness(110%) drop-shadow(0 0 8px #fff);
  }`}
`;
