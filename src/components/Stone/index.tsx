import { useRecoilState } from "recoil";
import styled from "styled-components";
import { StoneImg } from "../../assets/images";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";
import {
  settingsStateAtom,
  settingsStateAtomType,
} from "../../atoms/settingsState";

const Stone = () => {
  const [pullState] = useRecoilState<PullStateAtomType>(PullStateAtom);
  const [settingsState] =
    useRecoilState<settingsStateAtomType>(settingsStateAtom);

  return (
    <Wrapper
      src={StoneImg}
      alt="Stone"
      isReduced={settingsState.isReduced}
      pulling={pullState.pulling}
      width="400"
      height="251"
    />
  );
};

export default Stone;

interface WrapperProps {
  isReduced: boolean;
  pulling: boolean;
}

const Wrapper = styled.img<WrapperProps>`
  position: absolute;

  ${({ theme }) => theme.commons.boxShadow}

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pulling &&
      theme.animations.shake + "animation: shake 0.5s linear infinite"};
`;
