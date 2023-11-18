import axios from "@/components/lib/axiosFetch";
import { REVIEWS } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";

export function useGetReviews({ userId, projectId,update }) {
  return useQuery([REVIEWS, userId, projectId,update], async () => {
    const { data } = await axios(
      "GET",
      `${REVIEWS}?userId=${userId}&projectId=${projectId}&sortingOrders=createdAt-desc`
    );
    return data;
  });
}
