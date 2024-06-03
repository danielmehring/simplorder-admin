import React from 'react';
import {Button} from "@mui/material";
import {MinimalSpacer, VerticalSpacer1} from "../util/Spacers";
import {FiTerminal, FiUsers} from "react-icons/fi";
import {useNavigate} from "react-router-dom";

const Dashboard = (props: { auth: any }) => {
    const auth = props.auth;

    const navigate = useNavigate();

    const printFBIdToken = async () => {
        const idToken = await auth.currentUser.getIdToken();
        const FBIdToken = `Bearer ${idToken}`;
        console.log("FBIdToken", FBIdToken);
    }

    return (
        <div className="container">
            <div className="text-2xl">Dashboard</div>
            <VerticalSpacer1/>
            <Button
                startIcon={<FiUsers/>}
                size="small"
                variant="outlined"
                onClick={() => navigate("/restaurants")}
            >
                {"Restaurants anzeigen"}
            </Button>
            <MinimalSpacer/>
            <Button
                startIcon={<FiTerminal/>}
                size="small"
                variant="outlined"
                onClick={printFBIdToken}
            >
                {"Console Token"}
            </Button>
        </div>
    );
};

export default Dashboard;