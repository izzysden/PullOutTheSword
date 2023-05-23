import { useQuery } from "react-query";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { userLoad } from "../../libs/apis/user/load";

export default function useStatistics(username: string) {
  return useQuery(["userQuery", username], () => userLoad(username), {
    ...genericQueryOptions,
    enabled: username !== "",
  });
}
