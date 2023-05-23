import { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { SfxStateAtom, SfxStateAtomType } from "../../../../atoms/sfxState";
import { MenuImgs } from "../../../../assets/images";
import { lang, language } from "../../../../libs/constants/lang";

const BgmRange = () => {
  const [sfxState, setSfxState] =
    useRecoilState<SfxStateAtomType>(SfxStateAtom);
  const bgmVolumeInput = useRef<HTMLInputElement>(null);

  return (
    <li>
      <label htmlFor="bgmVolume">{lang[language].bgmVolume}</label>
      <Wrapper>
        <img src={MenuImgs.SfxImg} alt="" />
        <Range
          aria-label="sound effect volume"
          id="bgmVolume"
          type="range"
          min="0"
          max="100"
          defaultValue={sfxState.bgmVolume * 100}
          ref={bgmVolumeInput}
          onInput={() =>
            setSfxState((prevState) => {
              return {
                ...prevState,
                bgmVolume: parseInt(bgmVolumeInput.current!.value) / 100,
              };
            })
          }
          onMouseUp={() => {
            setSfxState((prevState) => {
              prevState.Music.volume = prevState.bgmVolume;
              return prevState;
            });
            localStorage.setItem("bgmVolume", sfxState.bgmVolume.toString());
          }}
        />
        <span>{sfxState.bgmVolume}</span>
      </Wrapper>
    </li>
  );
};

export default BgmRange;

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
