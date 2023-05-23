import axios from "axios";
import { PullSwordResponseType } from "../../../../types/sword/pull/response";
export const pullSword = async (
  username: string
): Promise<PullSwordResponseType> =>
  await axios
    .patch<PullSwordResponseType>(
      `${process.env.REACT_APP_BASE_URL}/pull/${username}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
