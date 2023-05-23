import { UserLoadResponseType } from "../../../user/load/response";

export interface LeaderboardLoadListResponseType {
  leaderboardResponses: UserLoadResponseType[];
  totalPage: number;
}
