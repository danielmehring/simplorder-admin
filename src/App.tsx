import React, {useEffect} from 'react';
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import './App.css';
import {useAtom} from "jotai";
import {isLoggedInAtom} from "./jotai/auth";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyBpKjsF6Gp9nf_jkHSy_c3mpGfUJ900muo",
        authDomain: "custommenucards.firebaseapp.com",
        projectId: "custommenucards",
        storageBucket: "custommenucards.appspot.com",
        messagingSenderId: "1041081817367",
        appId: "1:1041081817367:web:44223b3c961edf59f13f52"
    }; //TODO: change back before production

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const [isLoggedIn, setLoggedIn] = useAtom(isLoggedInAtom);

    const {pathname} = useLocation();
    const navigate = useNavigate();

    auth.onAuthStateChanged((user) => {
        if (user) {
            setLoggedIn(true);
            console.log("user", user, "auth", auth);
        } else {
            setLoggedIn(false);
        }
    });

    useEffect(() => {
        if (isLoggedIn) {
            if (pathname === "/login") {
                navigate("/");
            }
        } else {
            if (pathname !== "/login") {
                navigate("/login");
            }
        }
    }, [isLoggedIn]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={
                    <Dashboard auth={auth}/>
                }/>
                <Route path="/login" element={
                    <Login auth={auth}/>
                }/>
            </Routes>
        </div>
    );
}

export default App;
