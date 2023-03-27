import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";
import Button from "../Button";

const Header = () => {
  const [pullState] = useRecoilState<PullStateAtomType>(PullStateAtom);
  return (
    <Wrapper pulled={pullState.pulled} pulling={pullState.pulling}>
      <h2>Feeling Lucky?</h2>
      <h1>Pull Out The Sword!</h1>
      <Button labelText="Offline Mode" />
      <Button labelText="View Rank" />
      <Button labelText="Statistics" />
      <Button labelText="Settings" />
    </Wrapper>
  );
};

export default Header;

interface WrapperProps {
  pulled: boolean | undefined;
  pulling: boolean;
}

const Wrapper = styled.header<WrapperProps>`
  position: absolute;
  top: 100px;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 1;

  opacity: ${(props) => (props.pulled !== undefined || props.pulling ? 0 : 1)};
  transition: opacity 1s ease;

  h1 {
    margin-bottom: 8px;

    color: #ffffc9;
    font-size: 48px;

    filter: drop-shadow(0 0 8px #aaa);
  }

  h2 {
    color: #edfead;
    font-size: 32px;

    filter: drop-shadow(0 0 8px #aaa);
  }

  button {
    margin-bottom: 8px;
  }
`;
