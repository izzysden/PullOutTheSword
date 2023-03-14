import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DustGif, SwordImg } from "../../assets/images";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";

const Sword = () => {
  const [pullState] = useRecoilState<PullStateAtomType>(PullStateAtom);
  return (
    <>
      <Wrapper
        src={SwordImg}
        alt="Sword"
        pulled={pullState.pulled}
        pulling={pullState.pulling}
      />
      <Dust src={DustGif} alt="Dust" pulling={pullState.pulling} />
    </>
  );
};

export default Sword;

interface WrapperProps {
  pulled: boolean;
  pulling: boolean;
}

const Wrapper = styled.img<WrapperProps>`
  transform: translateX(10px);

  width: 400px;
  height: 400px;

  filter: brightness(110%) drop-shadow(0 0 8px red);
  transition: filter 0.25s ease;

  ${({ theme }) => theme.animations.rainbow}
  animation: rainbow 10s linear infinite;

  ${({ theme }) =>
    (props) =>
      props.pulled
        ? theme.animations.show + "animation: show 4s ease"
        : props.pulling &&
          theme.animations.pull +
            `transform: translateX(26px) translateY(-12px) rotate(3deg);
      animation: pull 4s ease-in-out`}
`;

interface DustProps {
  pulling: boolean;
}

const Dust = styled.img<DustProps>`
  position: absolute;
  bottom: 200px;

  transform: translateX(115px);

  opacity: ${(props) => (props.pulling ? 0.5 : 0)};

  transition: opacity 2s ease;

  ${({ theme }) => theme.animations.rainbow}
  animation: rainbow 10s linear infinite;

  pointer-events: none;
`;
