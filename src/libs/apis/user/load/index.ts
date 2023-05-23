import axios from "axios";
import { UserLoadResponseType } from "../../../../types/user/load/response";

export const userLoad = async (
  username: string
): Promise<UserLoadResponseType> =>
  await axios
    .get<UserLoadResponseType>(
      `${process.env.REACT_APP_BASE_URL}/user/${username}`
    )
    .then((response) => {
      return response.data;
    });
