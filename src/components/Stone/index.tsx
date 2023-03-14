import { useRecoilState } from "recoil";
import styled from "styled-components";
import { StoneImg } from "../../assets/images";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";

const Stone = () => {
  const [pullState] = useRecoilState<PullStateAtomType>(PullStateAtom);
  return <Wrapper src={StoneImg} alt="Stone" pulling={pullState.pulling} />;
};

export default Stone;

interface WrapperProps {
  pulling: boolean;
}

const Wrapper = styled.img<WrapperProps>`
  position: absolute;

  width: 400px;

  ${({ theme }) => theme.commons.boxShadow}

  ${({ theme }) =>
    (props) =>
      props.pulling && theme.animations.shake}
  ${(props) => props.pulling && "animation: shake 0.5s linear infinite"};
`;
