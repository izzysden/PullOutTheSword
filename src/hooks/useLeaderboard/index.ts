import { useInfiniteQuery } from "react-query";
import { LeaderboardLoadListRequestType } from "../../types/leaderboard/loadList/request";
import { leaderboardLoadList } from "../../libs/apis/leaderboard/loadList";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";

export default function useInfiniteLeaderboardList({
  type,
}: LeaderboardLoadListRequestType) {
  return useInfiniteQuery(
    ["leaderboardQuery", type],
    ({ pageParam = 1 }) =>
      leaderboardLoadList({
        type: type,
        page: pageParam,
      }),
    {
      ...genericQueryOptions,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return allPages.length < lastPage.totalPage ? nextPage : undefined;
      },
    }
  );
}
