import axios from "axios";
import { LeaderboardLoadListRequestType } from "../../../../types/leaderboard/loadList/request";
import { LeaderboardLoadListResponseType } from "../../../../types/leaderboard/loadList/response";

export const leaderboardLoadList = async ({
  type,
  page,
}: LeaderboardLoadListRequestType): Promise<LeaderboardLoadListResponseType> =>
  await axios
    .get<LeaderboardLoadListResponseType>(
      `${process.env.REACT_APP_BASE_URL}/leaderboard/${type}/${page}`
    )
    .then((response) => {
      return response.data;
    });
