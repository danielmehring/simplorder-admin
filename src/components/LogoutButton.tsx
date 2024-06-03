import React from 'react';
import {useLogout} from "../network/auth";
import {CircularProgress, IconButton} from "@mui/material";
import {FiLogOut} from "react-icons/fi";
import {useAtomValue} from "jotai";
import {isLoggedInAtom} from "../jotai/auth";

const LogoutButton = (props: {auth: any}) => {
    const auth = props.auth;

    const {isPending, mutate} = useLogout();

    const isLoggedIn = useAtomValue(isLoggedInAtom);

    if (!isLoggedIn) {
        return <></>;
    }


    return (
        <div className="fixed top-2 right-2">
            <IconButton onClick={() => mutate(auth)} sx={{backgroundColor: "rgba(0,0,0,0.1)"}}>
                {isPending ? (
                    <CircularProgress size={18}/>
                ) : (
                    <FiLogOut size={18}/>
                )}
            </IconButton>
        </div>
    );
};

export default LogoutButton;