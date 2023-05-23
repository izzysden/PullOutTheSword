import { useMutation, useQueryClient } from "react-query";
import { genericQueryOptions } from "../../libs/constants/genericQueryOptions";
import { pullSword } from "../../libs/apis/sword/pull";

export default function usePull(username: string) {
  const queryClient = useQueryClient();

  return useMutation(() => pullSword(username), {
    ...genericQueryOptions,
    onMutate: async (newData: string) => {
      await queryClient.cancelQueries(["userQuery", username]);
      const prevUserData = queryClient.getQueryData(["userQuery", username]);
      queryClient.setQueryData(["userQuery", username], (prevData: any) => {
        return {
          ...prevData,
          data: newData,
        };
      });
      return { prevUserData };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData(["userQuery", username], context?.prevUserData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["userQuery", username]);
      queryClient.invalidateQueries("leaderboardQuery");
    },
  });
}
