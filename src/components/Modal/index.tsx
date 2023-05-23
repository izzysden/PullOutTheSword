import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalStateAtom, ModalStateAtomType } from "../../atoms/modalState";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";
import { lang, language } from "../../libs/constants/lang";

interface ModalFrameProps {
  title: string;
  children?: JSX.Element;
}

const ModalFrame = ({ title, children }: ModalFrameProps) => {
  const [, setModalState] = useRecoilState<ModalStateAtomType>(ModalStateAtom);
  const [, setPullState] = useRecoilState<PullStateAtomType>(PullStateAtom);

  return createPortal(
    <Filter
      onClick={() => {
        setModalState({ title: "", modalContents: undefined });
        setPullState((prevState) => {
          return { ...prevState, pulled: undefined };
        });
      }}
    >
      <Wrapper
        onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
      >
        <h1>{title}</h1>
        <button
          aria-label={lang[language].close}
          type="button"
          onClick={() => {
            setModalState({ title: "", modalContents: undefined });
            setPullState((prevState) => {
              return { ...prevState, pulled: undefined };
            });
          }}
        >
          ✖
        </button>
        {children}
      </Wrapper>
    </Filter>,
    document.getElementById("modal")!
  );
};

export default ModalFrame;

const Filter = styled.aside`
  position: absolute;
  top: 0;

  background-color: ${({ theme }) => theme.colors.translucent};

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 98;
`;

const Wrapper = styled.article`
  position: absolute;

  background-color: ${({ theme }) => theme.colors.darkTranslucent};

  padding: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};

  border-radius: 10px;
  z-index: 99;

  ${({ theme }) => theme.animations.fadeIn + "animation: fadeIn 0.25s ease;"}

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.subTitle};

    filter: drop-shadow(0 0 8px ${({ theme }) => theme.colors.white});
  }

  > button {
    position: absolute;
    top: 4px;
    right: 8px;

    background-color: transparent;

    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.description};

    cursor: pointer;
    border: none;
    transition: color 0.25s ease;

    :hover {
      color: tomato;
    }
  }
`;
