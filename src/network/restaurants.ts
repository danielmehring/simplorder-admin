import {useAtomValue} from "jotai";
import {isLoggedInAtom} from "../jotai/auth";
import axios from "axios";
import {useInfiniteQuery} from "@tanstack/react-query";

export const useRestaurantInfiniteQuery = (auth: any) => {
    const pageSize = 3;
    const isLoggedIn = useAtomValue(isLoggedInAtom);

    const fetchRestaurants = async ({pageParam = null}) => {
        if (isLoggedIn) {
            const idToken = await auth.currentUser.getIdToken();
            const FBIdToken = `Bearer ${idToken}`;

            let queryData;

            if (pageParam) {
                queryData = {
                    pageSize,
                    pageToken: pageParam
                };
            } else {
                queryData = {
                    pageSize
                };
            }

            const response = await axios.get("/admin/restaurants", {
                params: queryData,
                headers: {
                    Authorization: FBIdToken,
                }
            });
            return response.data;
        } else {
            return {restaurants: [], nextPageToken: null};
        }
    }

    return useInfiniteQuery({
        initialPageParam: undefined,
        queryKey: ["restaurants"],
        queryFn: fetchRestaurants,
        getNextPageParam: (lastPage) => lastPage.nextPageToken,
        refetchOnWindowFocus: false
    });
};