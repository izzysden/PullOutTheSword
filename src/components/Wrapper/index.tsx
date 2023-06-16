import { useEffect, useState } from "react";
import styled from "styled-components";
import Filter from "../Filter";
import ResultModal from "../Modal/Result";
import { lang, language } from "../../libs/constants/lang";
import { pullSword } from "../../libs/apis/sword/pull";
import { useRecoilState } from "recoil";
import { UserLoadResponseType } from "../../types/user/load/response";
import { UserStateAtom } from "../../atoms/userState";
import { PullStateAtom, PullStateAtomType } from "../../atoms/pullState";
import {
  SettingsStateAtom,
  SettingsStateAtomType,
} from "../../atoms/settingsState";
import { SfxStateAtom, SfxStateAtomType } from "../../atoms/sfxState";
import { ModalStateAtom, ModalStateAtomType } from "../../atoms/modalState";
import { PullSwordResponseType } from "../../types/sword/pull/response";
import { useQueryClient } from "react-query";
import DialogueModal from "../Modal/Dialogue";

interface IWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: IWrapperProps) => {
  const [, setModalState] = useRecoilState<ModalStateAtomType>(ModalStateAtom);
  const [pullState, setPullState] =
    useRecoilState<PullStateAtomType>(PullStateAtom);
  const [settingsState] =
    useRecoilState<SettingsStateAtomType>(SettingsStateAtom);
  const [sfxState] = useRecoilState<SfxStateAtomType>(SfxStateAtom);
  const [userState] = useRecoilState<UserLoadResponseType>(UserStateAtom);
  const [cooldown, setCooldown] = useState<number>(0);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (
      pullState.pulled === undefined &&
      !pullState.pulling &&
      userState.cooldown !== undefined &&
      (userState.cooldown instanceof Date
        ? userState.cooldown.getTime() >= new Date().getTime()
        : Date.parse(userState.cooldown! as string) >= new Date().getTime())
    ) {
      const time =
        userState.cooldown instanceof Date
          ? userState.cooldown.getTime()
          : Date.parse(userState.cooldown! as string);
      setCooldown(Math.ceil((time - new Date().getTime()) / 1000));
      const timer = setInterval(
        () =>
          setCooldown((prevState) => {
            if (prevState < 2) {
              clearInterval(timer);
              return 0;
            } else return prevState - 1;
          }),
        1000
      );
      return () => clearInterval(timer);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.cooldown]);
  useEffect(() => {
    if (
      userState.cooldown !== undefined &&
      (userState.cooldown instanceof Date
        ? userState.cooldown.getTime() >= new Date().getTime()
        : Date.parse(userState.cooldown! as string) >= new Date().getTime())
    ) {
      const time =
        userState.cooldown instanceof Date
          ? userState.cooldown.getTime()
          : Date.parse(userState.cooldown! as string);
      setCooldown(Math.ceil((time - new Date().getTime()) / 1000));
      const timer = setInterval(
        () =>
          setCooldown((prevState) => {
            if (prevState < 2) {
              clearInterval(timer);
              return 0;
            } else return prevState - 1;
          }),
        1000
      );
      return () => clearInterval(timer);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pullState.pulled]);
  useEffect(() => {
    if (pullState.pulling) {
      if (settingsState.offlineMode)
        if (settingsState.isReduced)
          setPullState({
            pulling: false,
            pulled: !!(Math.random() <= (settingsState.chance as number) / 100),
          });
        else
          setTimeout(() => {
            sfxState.RollSfx.play();
            setTimeout(
              () =>
                setPullState({
                  pulling: false,
                  pulled: !!(
                    Math.random() <=
                    (settingsState.chance as number) / 100
                  ),
                }),
              3750
            );
          }, 250);
      else
        (async () => {
          const data: PullSwordResponseType = await pullSword(
            userState.username
          );
          if (data.pulled === undefined) {
            setPullState({
              pulling: false,
              pulled: undefined,
            });
            setModalState({
              title: lang[language].somethingWentWrong,
              modalContents: <DialogueModal message={data.message || "429"} />,
            });
          } else {
            queryClient.invalidateQueries(["userQuery", userState.username]);
            queryClient.invalidateQueries("leaderboardQuery");
            if (settingsState.isReduced)
              setPullState({ pulling: false, pulled: data.pulled });
            else
              setTimeout(() => {
                sfxState.RollSfx.play();
                setTimeout(
                  () =>
                    setPullState({
                      pulling: false,
                      pulled: data.pulled,
                    }),
                  3750
                );
              }, 250);
          }
        })();
    }
    if (pullState.pulled !== undefined && !pullState.pulling)
      if (settingsState.isReduced)
        if (pullState.pulled) {
          sfxState.WinSfx.currentTime = 0;
          sfxState.WinSfx.play();
          setModalState({
            title: lang[language].success,
            modalContents: <ResultModal />,
          });
        } else {
          sfxState.LoseSfx.currentTime = 0;
          sfxState.LoseSfx.play();
          setModalState({
            title: lang[language].failed,
            modalContents: <ResultModal />,
          });
        }
      else {
        if (pullState.pulled)
          setTimeout(() => {
            sfxState.PullSfx.play();
            setTimeout(() => {
              sfxState.WinSfx.currentTime = 0;
              sfxState.WinSfx.play();
              setModalState({
                title: lang[language].success,
                modalContents: <ResultModal />,
              });
            }, 1000);
          }, 750);
        else
          setTimeout(() => {
            sfxState.LoseSfx.currentTime = 0;
            sfxState.LoseSfx.play();
            setTimeout(
              () =>
                setModalState({
                  title: lang[language].failed,
                  modalContents: <ResultModal />,
                }),
              1000
            );
          }, 750);
      } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pullState.pulling, pullState.pulled]);
  return (
    <>
      <Filter
        aria-hidden="true"
        isReduced={settingsState.isReduced}
        pullState={pullState}
      />
      <Parent
        aria-label={lang[language].heading}
        role="button"
        tabIndex={0}
        isReady={cooldown <= 0}
        isReduced={settingsState.isReduced}
        pullState={pullState}
        onClick={() => {
          if (
            cooldown <= 0 &&
            pullState.pulled === undefined &&
            !pullState.pulling
          )
            setPullState((prevState) => {
              return { ...prevState, pulling: true };
            });
        }}
      >
        {cooldown > 0 && pullState.pulled !== true && (
          <GuideText>{`${lang[language].availableIn} ${cooldown}${lang[language].seconds}`}</GuideText>
        )}
        {children}
      </Parent>
    </>
  );
};

export default Wrapper;

interface ParentProps {
  isReady: boolean;
  isReduced: boolean;
  pullState: PullStateAtomType;
}
const GuideText = styled.p`
  background-color: ${({ theme }) => theme.colors.darkTranslucent};

  position: absolute;
  transform: translateX(20px) translateY(-150px);

  padding: 4px 8px 4px 8px;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.text};

  border-radius: 10px;
  z-index: 1;
`;
const Parent = styled.main<ParentProps>`
  position: absolute;
  left: calc(50vw - 220px);
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  ${({ theme }) =>
    (props) =>
      props.isReady ||
      props.pullState.pulled === true ||
      props.pullState.pulling
        ? props.isReady &&
          `cursor: pointer;
  transition: filter 0.25s ease; :hover {
    filter: brightness(110%) drop-shadow(0 0 8px ${theme.colors.white});
  }`
        : `filter: contrast(0.5) saturate(0);`}
`;
