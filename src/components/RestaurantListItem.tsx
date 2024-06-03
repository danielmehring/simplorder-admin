import React from 'react';
import {Restaurant} from "../types/Types";
import {ButtonBase} from "@mui/material";
import {MdOutlineNumbers} from "react-icons/md";
import {formatUnixToTextTimeDate} from "../util/textHelper";

const RestaurantListItem = (props: {restaurant: Restaurant}) => {
    const restaurant = props.restaurant;

    return (
        <ButtonBase sx={{width: "100%", marginBottom: "16px", borderRadius: "8px"}}>
            <div className="w-full flex flex-col border rounded-lg py-2 px-3 items-start gap-1">
                <div className="flex w-full items-center">
                    <div className="text-lg text-stone-800">{restaurant.name}</div>
                    <div className="flex ml-auto items-center text-stone-500">
                        <MdOutlineNumbers/>
                        <div>{restaurant.restaurantID}</div>
                    </div>
                </div>
                <div className="flex items-center text-stone-600 gap-2">
                    <div>Prefix: {restaurant.prefix}</div>
                    {restaurant.wantedPrefix ? (
                        <div className="text-stone-400">{restaurant.wantedPrefix}</div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="text-sm text-stone-400">created at: {formatUnixToTextTimeDate(restaurant.createdAt)}</div>
            </div>
        </ButtonBase>
    );
};

export default RestaurantListItem;