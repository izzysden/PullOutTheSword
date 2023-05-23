import { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SfxStateAtom, SfxStateAtomType } from "../../../../atoms/sfxState";
import { MenuImgs } from "../../../../assets/images";
import { lang, language } from "../../../../libs/constants/lang";

const SfxRange = () => {
  const [sfxState, setSfxState] =
    useRecoilState<SfxStateAtomType>(SfxStateAtom);
  const sfxVolumeInput = useRef<HTMLInputElement>(null);

  return (
    <li>
      <label htmlFor="sfxVolume">{lang[language].sfxVolume}</label>
      <Wrapper>
        <img src={MenuImgs.SfxImg} alt="" />
        <Range
          aria-label="sound effect volume"
          id="sfxVolume"
          type="range"
          min="0"
          max="100"
          defaultValue={sfxState.volume * 100}
          ref={sfxVolumeInput}
          onInput={() =>
            setSfxState((prevState) => {
              return {
                ...prevState,
                volume: parseInt(sfxVolumeInput.current!.value) / 100,
              };
            })
          }
          onMouseUp={() => {
            setSfxState((prevState) => {
              prevState.LoseSfx.volume = prevState.volume;
              prevState.PullSfx.volume = prevState.volume;
              prevState.RollSfx.volume = prevState.volume;
              prevState.WinSfx.volume = prevState.volume;
              return prevState;
            });
            sfxState.LoseSfx.currentTime = 0;
            sfxState.LoseSfx.play();
            localStorage.setItem("sfxVolume", sfxState.volume.toString());
          }}
        />
        <span>{sfxState.volume}</span>
      </Wrapper>
    </li>
  );
};

export default SfxRange;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 8px;
  }

  span {
    margin-left: 8px;
  }
`;

const Range = styled.input`
  all: unset;

  background-color: ${({ theme }) => theme.colors.lightTranslucent};

  width: 200px;
  height: 16px;

  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  transition: opacity 0.25s ease;
  opacity: 0.75;

  :hover,
  :focus {
    opacity: 1;
  }

  ::-webkit-slider-thumb {
    appearance: none;

    background-color: ${({ theme }) => theme.colors.white};

    width: 24px;
    height: 24px;

    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.white};
    border-radius: 50%;
  }

  ::-moz-range-thumb {
    background-color: ${({ theme }) => theme.colors.white};

    width: 24px;
    height: 24px;

    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.white};
    border-radius: 50%;
  }
`;
