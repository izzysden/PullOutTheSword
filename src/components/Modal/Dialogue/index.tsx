import styled from "styled-components";
import ModalButton from "../Button";
import { lang, language } from "../../../libs/constants/lang";
import { useRecoilState } from "recoil";
import { ModalStateAtom, ModalStateAtomType } from "../../../atoms/modalState";
import { useEffect, useState } from "react";

interface DialogueModalProps {
  message: string;
}

const DialogueModal = ({ message }: DialogueModalProps) => {
  const [, setModalState] = useRecoilState<ModalStateAtomType>(ModalStateAtom);
  const [translatedMessage, setTranslatedMessage] = useState<string[]>([]);

  useEffect(() => {
    switch (message) {
      case "URI Not Found!":
        setTranslatedMessage([lang[language].usernameIsNotSet]);
        break;
      case "Inappropriate Username.":
        setTranslatedMessage([lang[language].inappropriateUsername]);
        break;
      case "Invalid Username Pattern.":
        setTranslatedMessage([
          lang[language].invalidUsername,
          lang[language].usernameGuide1,
          lang[language].usernameGuide2,
          lang[language].usernameGuide3,
          lang[language].usernameGuide4,
        ]);
        break;
      case "Too many requests, please try again later.":
        setTranslatedMessage([lang[language].tooManyRequest]);
        break;
      case "429":
        setTranslatedMessage([lang[language][429]]);
        break;
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <p>{translatedMessage[0]}</p>
      {translatedMessage.length > 1 && (
        <>
          <p>{translatedMessage[1]}</p>
          <ul>
            {translatedMessage.slice(2, 4).map((v) => {
              return <li>{v}</li>;
            })}
          </ul>
        </>
      )}
      <ModalButton
        onClick={() => setModalState({ title: "", modalContents: undefined })}
      />
    </Wrapper>
  );
};

export default DialogueModal;

const Wrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.text};
`;
