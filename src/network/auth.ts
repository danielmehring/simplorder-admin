import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import {useMutation} from "@tanstack/react-query";
import {useSetAtom} from "jotai";
import {isLoggedInAtom} from "../jotai/auth";
import {LoginData} from "../types/Types";

export const useLogin = () => {
    const setIsLoggedIn = useSetAtom(isLoggedInAtom);

    const login = async (loginData: LoginData) => {
        const auth = loginData.auth;
        const email = loginData.email;
        const password = loginData.password;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            return auth;
        } catch (error: any) {
            throw new Error(error);
        }
    }


    return useMutation({
        mutationFn: (loginData: LoginData) => login(loginData)
    })
}

export const useLogout = () => {
    const setIsLoggedIn = useSetAtom(isLoggedInAtom);

    return useMutation({
        // @ts-ignore
        mutationFn: (auth) => signOut(auth),
        onSuccess: () => {
            setIsLoggedIn(false);
            window.location.reload();
        }
    });
}