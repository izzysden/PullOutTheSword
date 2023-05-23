import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalStateAtom, ModalStateAtomType } from "../../../atoms/modalState";
import { PullStateAtom, PullStateAtomType } from "../../../atoms/pullState";
import { UserStateAtom } from "../../../atoms/userState";
import ModalButton from "../Button";
import { lang, language } from "../../../libs/constants/lang";
import { UserLoadResponseType } from "../../../types/user/load/response";

const ResultModal = () => {
  const [userState] = useRecoilState<UserLoadResponseType>(UserStateAtom);
  const [pullState, setPullState] =
    useRecoilState<PullStateAtomType>(PullStateAtom);
  const [, setModalState] = useRecoilState<ModalStateAtomType>(ModalStateAtom);

  return (
    <div>
      <List>
        <li>
          {`${lang[language].statistics2}: ${userState.tries - 1} -> ${
            userState.tries
          }`}
        </li>
        <li>
          {pullState.pulled === true
            ? `${lang[language].statistics3}: ${userState.pulls - 1} -> ${
                userState.pulls
              }`
            : `${lang[language].statistics3}: ${userState.pulls} -> ${userState.pulls}`}
        </li>
        <li>{`${lang[language].tpp}: ${userState.tpp}`}</li>
      </List>
      <ModalButton
        onClick={() => {
          setPullState((prevState) => {
            return { ...prevState, pulled: undefined };
          });
          setModalState({ title: "", modalContents: undefined });
        }}
      />
    </div>
  );
};

export default ResultModal;

const List = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.text};

  list-style-type: none;
`;
