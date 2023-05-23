export interface LeaderboardLoadListRequestType {
  type: "tries" | "pulls" | "tppL" | "tppH";
  page?: number;
}
