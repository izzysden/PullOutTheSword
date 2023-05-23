import { UserLoadResponseType } from "../../../user/load/response";

export interface PullSwordResponseType {
  userResponses: UserLoadResponseType;
  pulled: boolean;
  code?: number;
  message?: string;
}
