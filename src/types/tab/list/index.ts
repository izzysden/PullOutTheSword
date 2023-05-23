import { LeaderboardTabList } from "../leaderboard";
import { SettingsTabList } from "../settings";

export interface TabListType {
  id: LeaderboardTabList | SettingsTabList;
  value: string;
}
