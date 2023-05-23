import { useEffect } from "react";
import useInfiniteLeaderboardList from "../../../../hooks/useLeaderboard";
import { lang, language } from "../../../../libs/constants/lang";
import { UserLoadResponseType } from "../../../../types/user/load/response";
import { useInView } from "react-intersection-observer";

interface TopTriesProps {
  user?: UserLoadResponseType;
}

const TopTries = ({ user }: TopTriesProps) => {
  const leaderboardQuery = useInfiniteLeaderboardList({
    type: "tries",
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
        {leaderboardQuery.status === "success" &&
          leaderboardQuery.data.pages.map((page, pageIndex) =>
            page.leaderboardResponses.map((v, i) => {
              return (
                <li
                  key={`tries${i}`}
                  ref={
                    pageIndex === leaderboardQuery.data.pages.length - 1 &&
                    i === page.leaderboardResponses.length - 1
                      ? ref
                      : undefined
                  }
                  className={
                    user.username === v.username ? "highlight" : undefined
                  }
                >
                  {`${i + 1 + pageIndex * 20}. ${v.username}: ${v.tries}${
                    user.username === v.username
                      ? ` (${lang[language].you}!)`
                      : ""
                  }`}
                  <p>{`${v.tries} ${lang[language].tries}, ${v.pulls} ${lang[language].pulls} (${v.tpp})`}</p>
                </li>
              );
            })
          )}
      </ol>
      <p>
        {user.username}: {user.tries}
      </p>
    </>
  ) : (
    <>
      <ol>
        {leaderboardQuery.status === "success" &&
          leaderboardQuery.data.pages.map((page, pageIndex) =>
            page.leaderboardResponses.map((v, i) => (
              <li
                key={`tries${i}`}
                ref={
                  pageIndex === leaderboardQuery.data.pages.length - 1 &&
                  i === page.leaderboardResponses.length - 1
                    ? ref
                    : undefined
                }
              >
                {`${i + 1 + pageIndex * 20}. ${v.username}: ${v.tries}`}
                <p>{`${v.tries} ${lang[language].tries}, ${v.pulls} ${lang[language].pulls} (${v.tpp})`}</p>
              </li>
            ))
          )}
      </ol>
      <p>-</p>
    </>
  );
};

export default TopTries;
