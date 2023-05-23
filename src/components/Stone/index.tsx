import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";
import { SwordImgs } from "../../assets/images";
import { lang, language } from "../../libs/constants/lang";
import {
  SettingsStateAtom,
  SettingsStateAtomType,
} from "../../atoms/settingsState";

const Stone = () => {
  const [pullState] = useRecoilState<PullStateAtomType>(PullStateAtom);
  const [settingsState] =
    useRecoilState<SettingsStateAtomType>(SettingsStateAtom);
  return (
    <Wrapper
      aria-hidden="true"
      src={SwordImgs.StoneImg}
      alt={lang[language].stone}
      isReduced={settingsState.isReduced}
      pulling={pullState.pulling}
      width="400"
      height="251"
    />
  );
};

export default Stone;

interface IWrapperProps {
  isReduced: boolean;
  pulling: boolean;
}
const Wrapper = styled.img<IWrapperProps>`
  position: absolute;

  ${({ theme }) => theme.commons.boxShadow}

  ${({ theme }) =>
    (props) =>
      !props.isReduced &&
      props.pulling &&
      theme.animations.shake + "animation: shake 0.5s linear infinite"};
`;
