import styled from "styled-components";
import ModalButton from "../Button";
import { useRecoilState } from "recoil";
import { ModalStateAtom, ModalStateAtomType } from "../../../atoms/modalState";
import { ManualImgs } from "../../../assets/images";
import { lang, language } from "../../../libs/constants/lang";

const ManualModal = () => {
  const [, setModalState] = useRecoilState<ModalStateAtomType>(ModalStateAtom);

  return (
    <Wrapper>
      <div>
        <article>
          <figure>
            <img src={ManualImgs.PotsImg} alt="" width="100" height="100" />
          </figure>
          <div>
            <h2>{lang[language].manual1}</h2>
            <p>{lang[language].manual11}</p>
            <p>{lang[language].manual12}</p>
          </div>
        </article>
        <article>
          <div>
            <h2>{lang[language].manual2}</h2>
            <p>{lang[language].manual21}</p>
            <p>{lang[language].manual22}</p>
          </div>
          <figure>
            <img
              src={ManualImgs.LeaderboardImg}
              alt=""
              width="100"
              height="100"
            />
          </figure>
        </article>
        <article>
          <figure>
            <img src={ManualImgs.OfflineImg} alt="" width="100" height="100" />
          </figure>
          <div>
            <h2>{lang[language].manual3}</h2>
            <p>{lang[language].manual31}</p>
            <p>{lang[language].manual32}</p>
          </div>
        </article>
        <article>
          <div>
            <h2>{lang[language].manual4}</h2>
            <p>{lang[language].manual41}</p>
            <p>{lang[language].manual42}</p>
            <p>{lang[language].manual43}</p>
            <p>{lang[language].manual44}</p>
          </div>
        </article>
      </div>

      <ModalButton
        onClick={() => {
          setModalState({ title: "", modalContents: undefined });
        }}
      />
    </Wrapper>
  );
};

export default ManualModal;

const Wrapper = styled.div`
  margin-top: 8px;

  @media screen and (max-width: 900px) {
    width: 90vw;
  }

  @media screen and (min-width: 900px) {
    width: 808px;
  }

  font-size: ${({ theme }) => theme.fontSizes.text};

  border-top: 1px solid ${({ theme }) => theme.colors.white};

  article {
    background-color: ${({ theme }) => theme.colors.translucent};

    padding: 8px;
    margin-top: 8px;

    display: flex;

    border-radius: 10px;

    div {
      :nth-child(2n) {
        margin-left: 8px;
      }
      :nth-child(2n-1) {
        margin-right: 8px;
      }

      width: 100%;
    }
  }

  h2 {
    color: ${({ theme }) => theme.colors.white};

    @media screen and (max-width: 900px) {
      font-size: ${({ theme }) => theme.fontSizes.subText};
    }

    @media screen and (min-width: 900px) {
      font-size: ${({ theme }) => theme.fontSizes.text};
    }
  }

  p {
    color: ${({ theme }) => theme.colors.grey};

    @media screen and (max-width: 900px) {
      font-size: ${({ theme }) => theme.fontSizes.description};
    }

    @media screen and (min-width: 900px) {
      font-size: ${({ theme }) => theme.fontSizes.subText};
    }
  }

  img {
    object-fit: cover;
    border-radius: 50%;

    @media screen and (max-width: 900px) {
      display: none;
    }
  }
`;
