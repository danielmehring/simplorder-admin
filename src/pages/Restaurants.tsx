import React from 'react';
import {VerticalSpacer1} from "../util/Spacers";
import RestaurantList from "../components/RestaurantList";

const Restaurants = (props: {auth: any}) => {
    const auth = props.auth;


    return (
        <div className="container">
            <div className="text-2xl">Restaurants</div>
            <VerticalSpacer1/>
            <RestaurantList auth={auth}/>
        </div>
    );
};

export default Restaurants;