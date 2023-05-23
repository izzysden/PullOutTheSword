import styled from "styled-components";
import { PullStateAtomType } from "../../atoms/pullState";

interface FilterProps {
  isReduced: boolean;
  pullState: PullStateAtomType;
}

const Filter = ({ isReduced, pullState }: FilterProps) => {
  return (
    <Wrapper aria-hidden="true" isReduced={isReduced} pullState={pullState} />
  );
};

export default Filter;

const Wrapper = styled.aside<FilterProps>`
  position: absolute;
  top: 0;

  background-color: ${({ theme }) => theme.colors.white};

  width: 100vw;
  height: 100vh;

  visibility: hidden;

  opacity: 0;
  z-index: 97;

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pullState.pulling &&
      theme.animations.fadeIn +
        `animation: fadeIn 4s ease-in;
  visibility: visible;
  opacity: 1;`}

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pullState.pulled !== undefined &&
      theme.animations.fadeOut + `animation: fadeOut 1s linear;`}
`;
