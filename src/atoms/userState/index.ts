import { atom } from "recoil";
import { UserLoadResponseType } from "../../types/user/load/response";

const username = localStorage.getItem("username");

export const UserStateAtom = atom<UserLoadResponseType>({
  key: "userState",
  default: {
    username: username ? username : "",
    tries: 0,
    pulls: 0,
    cooldown: undefined,
    tpp: 0,
  },
});
