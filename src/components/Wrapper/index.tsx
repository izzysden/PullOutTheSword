import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: WrapperProps) => {
  const [pullState, setPullState] =
    useRecoilState<PullStateAtomType>(PullStateAtom);
  return (
    <Click
      onClick={() => {
        if (!pullState.pulling && !pullState.pulled)
          setPullState((prevState) => {
            return { ...prevState, pulling: true };
          });
      }}
    >
      {children}
    </Click>
  );
};

export default Wrapper;



const Click = styled.article`
  position: absolute;
  left: calc(50vw - 200px);
  bottom: 0;

  display: flex;
  align-items: flex-end;

  cursor: pointer;
  transition: filter 0.25s ease;

  :hover {
    filter: brightness(110%) drop-shadow(0 0 8px #fff);
  }
`;
