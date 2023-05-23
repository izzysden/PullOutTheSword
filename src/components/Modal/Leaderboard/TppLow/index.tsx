import { useInView } from "react-intersection-observer";
import useInfiniteLeaderboardList from "../../../../hooks/useLeaderboard";
import { lang, language } from "../../../../libs/constants/lang";
import { UserLoadResponseType } from "../../../../types/user/load/response";
import { useEffect } from "react";

interface TppLowProps {
  user?: UserLoadResponseType;
}

const TppLow = ({ user }: TppLowProps) => {
  const leaderboardQuery = useInfiniteLeaderboardList({
    type: "tppL",
  });

  const { ref, inView } = useInView();
  useEffect(
    () => {
      if (inView) leaderboardQuery.fetchNextPage();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [inView, leaderboardQuery.data]
  );

  return user && user.username && user.pulls > 0 ? (
    <>
      <ol>
        {leaderboardQuery.data?.pages.map((page, pageIndex) =>
          page.leaderboardResponses.map((v, i) => (
            <li
              key={`tppLow${i}`}
              ref={
                pageIndex === leaderboardQuery.data.pages.length - 1 &&
                i === page.leaderboardResponses.length - 1
                  ? ref
                  : undefined
              }
              className={user.username === v.username ? "highlight" : undefined}
            >
              {`${i + 1 + pageIndex * 20}. ${v.username}: ${(
                v.tries / v.pulls
              ).toFixed(2)}${user.username === v.username ? " (You!)" : ""}`}
              <p>{`${v.tries} ${lang[language].tries}, ${v.pulls} ${
                lang[language].pulls
              } (${(v.tries / v.pulls).toFixed(2)})`}</p>
            </li>
          ))
        )}
      </ol>
      <p>
        {user.username}: {(user.tries / user.pulls).toFixed(2)}
      </p>
    </>
  ) : (
    <>
      <ol>
        {leaderboardQuery.data?.pages.map((page, pageIndex) =>
          page.leaderboardResponses.map((v, i) => (
            <li
              key={`tppLow${i}`}
              ref={
                pageIndex === leaderboardQuery.data.pages.length - 1 &&
                i === page.leaderboardResponses.length - 1
                  ? ref
                  : undefined
              }
            >
              {`${i + 1 + pageIndex * 20}. ${v.username}: ${(
                v.tries / v.pulls
              ).toFixed(2)}`}
              <p>{`${v.tries} ${lang[language].tries}, ${v.pulls} ${
                lang[language].pulls
              } (${(v.tries / v.pulls).toFixed(2)})`}</p>
            </li>
          ))
        )}
      </ol>
      <p>-</p>
    </>
  );
};

export default TppLow;
