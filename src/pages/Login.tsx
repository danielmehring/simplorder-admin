import React, {useState} from 'react';
import {useLogin} from "../network/auth";
import {Button, CircularProgress, TextField, Typography} from "@mui/material";
import {VerticalSpacer0, VerticalSpacer1, VerticalSpacer2} from "../util/Spacers";

const Login = (props: { auth: any }) => {
    const auth = props.auth;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error2, setError2] = useState<string>("");

    const {mutate, isPending, isError} = useLogin();

    const login = () => {
        if (validateForm()) {
            // @ts-ignore
            mutate({auth, email, password});
        }
    }

    const validateForm = () => {
        setError2("");
        if (email === "" || password === "") {
            setError2("Alle Felder müssen ausgefüllt sein.");
            return false;
        }

        return true;
    }

    return (
        <div className="flex flex-wrap items-center justify-center w-full h-screen text-center fade-in">
            <div className="w-[260px] sm:w-[350px]">
                <Typography variant="h4">Login</Typography>
                <VerticalSpacer2/>
                <form noValidate onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}>
                    <TextField
                        id="loginemail"
                        name="email"
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <VerticalSpacer0/>
                    <TextField
                        id="loginpassword"
                        name="password"
                        type="password"
                        label="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <VerticalSpacer2/>
                    {isPending ? (
                        <div className="w-full flex justify-center">
                            <CircularProgress/>
                        </div>
                    ) : (
                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                    )}

                    <VerticalSpacer1/>


                    <VerticalSpacer1/>
                    <div>{error2}</div>
                    {isError ? (
                        <div>{"Die Email und/oder das Passwort ist nicht korrekt."}</div>
                    ) : (
                        <div/>
                    )}

                </form>
            </div>
        </div>
    );
};

export default Login;