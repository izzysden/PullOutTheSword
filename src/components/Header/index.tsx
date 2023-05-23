import { useRecoilState } from "recoil";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";
import styled from "styled-components";
import { lang, language } from "../../libs/constants/lang";
import {
  SettingsStateAtom,
  SettingsStateAtomType,
} from "../../atoms/settingsState";

const Header = () => {
  const [pullState] = useRecoilState<PullStateAtomType>(PullStateAtom);
  const [settingsState] =
    useRecoilState<SettingsStateAtomType>(SettingsStateAtom);

  return (
    <Wrapper isReduced={settingsState.isReduced} pullState={pullState}>
      <p>{lang[language].subHeading}</p>
      <Bounce
        aria-label={lang[language].heading}
        length={lang[language].heading.length}
      >
        {lang[language].heading.split("").map((v, i) =>
          v !== " " ? (
            <p key={`heading${i}`} aria-hidden="true">
              {v}
            </p>
          ) : (
            <span key={`heading${i}`} aria-hidden="true" />
          )
        )}
      </Bounce>
    </Wrapper>
  );
};

export default Header;

interface BounceProps {
  length: number;
}

const Bounce = styled.h2<BounceProps>`
  display: flex;

  color: ${({ theme }) => theme.colors.main};

  @media screen and (max-width: 900px) {
    font-size: ${({ theme }) => theme.fontSizes.subTitle};
  }

  @media screen and (min-width: 900px) {
    font-size: ${({ theme }) => theme.fontSizes.title};
  }

  ${({ theme }) => theme.animations.bounce}

  p {
    :nth-of-type(1) {
      animation: bounce 4.5s ease-out 0s infinite;
    }
    :nth-of-type(2) {
      animation: bounce 4.5s ease-out 0.1s infinite;
    }
    :nth-of-type(3) {
      animation: bounce 4.5s ease-out 0.2s infinite;
    }
    :nth-of-type(4) {
      animation: bounce 4.5s ease-out 0.3s infinite;
    }
    :nth-of-type(5) {
      animation: bounce 4.5s ease-out 0.4s infinite;
    }
    :nth-of-type(6) {
      animation: bounce 4.5s ease-out 0.5s infinite;
    }
    :nth-of-type(7) {
      animation: bounce 4.5s ease-out 0.6s infinite;
    }
    :nth-of-type(8) {
      animation: bounce 4.5s ease-out 0.7s infinite;
    }
    :nth-of-type(9) {
      animation: bounce 4.5s ease-out 0.8s infinite;
    }
    :nth-of-type(10) {
      animation: bounce 4.5s ease-out 0.9s infinite;
    }
    :nth-of-type(11) {
      animation: bounce 4.5s ease-out 1s infinite;
    }
    :nth-of-type(12) {
      animation: bounce 4.5s ease-out 1.1s infinite;
    }
    :nth-of-type(13) {
      animation: bounce 4.5s ease-out 1.2s infinite;
    }
    :nth-of-type(14) {
      animation: bounce 4.5s ease-out 1.3s infinite;
    }
    :nth-of-type(15) {
      animation: bounce 4.5s ease-out 1.4s infinite;
    }
    :nth-of-type(16) {
      animation: bounce 4.5s ease-out 1.5s infinite;
    }
  }

  span {
    margin-left: 8px;
  }
`;

interface WrapperProps {
  isReduced: boolean;
  pullState: PullStateAtomType;
}

const Wrapper = styled.article<WrapperProps>`
  position: absolute;

  @media screen and (max-width: 900px) {
    top: 20px;
    left: 20px;
  }

  @media screen and (min-width: 900px) {
    top: 50px;
    left: 50%;

    transform: translateX(-50%);
  }

  background-color: ${({ theme }) => theme.colors.darkTranslucent};

  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;

  text-align: center;

  border-radius: 10px;
  z-index: 1;

  opacity: ${(props) =>
    !props.isReduced &&
    (props.pullState.pulled !== undefined || props.pullState.pulling)
      ? 0
      : 1};
  transition: opacity 1s ease;

  p {
    filter: drop-shadow(0 0 8px ${({ theme }) => theme.colors.darkGrey});
  }

  > p {
    color: ${({ theme }) => theme.colors.subMain};
    font-size: ${({ theme }) => theme.fontSizes.subTitle};
  }
`;
