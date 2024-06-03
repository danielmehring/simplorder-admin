import React, {useEffect, useMemo, useRef} from 'react';
import {useRestaurantInfiniteQuery} from "../network/restaurants";
import {useIntersection} from "@mantine/hooks";
import {Restaurant} from "../types/Types";
import {CircularProgress} from "@mui/material";
import RestaurantListItem from "./RestaurantListItem";

interface Page {
    restaurants: Restaurant[];
}

const RestaurantList = (props: {auth: any}) => {
    const auth = props.auth;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useRestaurantInfiniteQuery(auth);

    const lastRestaurantRef = useRef(null);
    const {ref, entry} = useIntersection({
        root: lastRestaurantRef.current,
        threshold: 1
    });

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) {
            fetchNextPage().then(() => {});
        }
    }, [entry, fetchNextPage, hasNextPage]);


    const pages = data?.pages;

    const allItems: Restaurant[] = useMemo(() => {
        if (pages) {
            return pages.reduce((acc: Restaurant[], page: Page) => [...acc, ...page.restaurants], []) || [];
        } else {
            return [];
        }
    }, [pages]);

    if (!data || isLoading) {
        return (
            <div className="flex justify-center items-center mt-5">
                <CircularProgress size={18}/>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 pb-16 md:mt-5">
            <div className="gap-6 px-2 md:grid md:grid-cols-2">
                {allItems.map((restaurant: Restaurant, index: number) => {
                    return (
                        <div ref={ref} className="w-full flex flex-col justify-end" key={index}>
                            <RestaurantListItem restaurant={restaurant} />
                        </div>
                    );
                })}
            </div>
            {isFetchingNextPage ? (
                <div className="flex justify-center items-center mt-3">
                    <CircularProgress size={18}/>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default RestaurantList;