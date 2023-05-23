import { useEffect } from "react";
import useInfiniteLeaderboardList from "../../../../hooks/useLeaderboard";
import { lang, language } from "../../../../libs/constants/lang";
import { UserLoadResponseType } from "../../../../types/user/load/response";
import { useInView } from "react-intersection-observer";

interface TopPullsProps {
  user?: UserLoadResponseType;
}

const TopPulls = ({ user }: TopPullsProps) => {
  const leaderboardQuery = useInfiniteLeaderboardList({
    type: "pulls",
  });

  const { ref, inView } = useInView();
  useEffect(
    () => {
      if (inView) leaderboardQuery.fetchNextPage();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [inView, leaderboardQuery.data]
  );

  return user && user.username ? (
    <>
      <ol>
        {leaderboardQuery.data?.pages.map((page, pageIndex) =>
          page.leaderboardResponses.map((v, i) => (
            <li
              key={`pulls${i}`}
              ref={
                pageIndex === leaderboardQuery.data.pages.length - 1 &&
                i === page.leaderboardResponses.length - 1
                  ? ref
                  : undefined
              }
              className={user.username === v.username ? "highlight" : undefined}
            >
              {`${i + 1 + pageIndex * 20}. ${v.username}: ${v.pulls}${
                user.username === v.username ? " (You!)" : ""
              }`}
              <p>{`${v.tries} ${lang[language].tries}, ${v.pulls}  ${lang[language].pulls} (${v.tpp})`}</p>
            </li>
          ))
        )}
      </ol>
      <p>
        {user.username}: {user.pulls}
      </p>
    </>
  ) : (
    <>
      <ol>
        {leaderboardQuery.data?.pages.map((page, pageIndex) =>
          page.leaderboardResponses.map((v, i) => (
            <li
              key={`pulls${i}`}
              ref={
                pageIndex === leaderboardQuery.data.pages.length - 1 &&
                i === page.leaderboardResponses.length - 1
                  ? ref
                  : undefined
              }
            >
              {`${i + 1 + pageIndex * 20}. ${v.username}: ${v.pulls}`}
              <p>{`${v.tries} ${lang[language].tries}, ${v.pulls} ${lang[language].pulls} (${v.tpp})`}</p>
            </li>
          ))
        )}
      </ol>
      <p>-</p>
    </>
  );
};

export default TopPulls;
