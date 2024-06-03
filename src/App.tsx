import React, {useEffect} from 'react';
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import './App.css';
import {useAtom} from "jotai";
import {isLoggedInAtom} from "./jotai/auth";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import LogoutButton from "./components/LogoutButton";
import Restaurants from "./pages/Restaurants";

function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyDsHLO-lf9Ny7x_VSVdUXpIJ1Cvo9sV2UY",
        authDomain: "simplorderapi.firebaseapp.com",
        projectId: "simplorderapi",
        storageBucket: "simplorderapi.appspot.com",
        messagingSenderId: "411236134786",
        appId: "1:411236134786:web:7e025154553a890e5be99b"
    }; //TODO: change back before developing

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const [isLoggedIn, setLoggedIn] = useAtom(isLoggedInAtom);

    const {pathname} = useLocation();
    const navigate = useNavigate();

    auth.onAuthStateChanged((user) => {
        if (user) {
            setLoggedIn(true);
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
    }, [isLoggedIn, navigate, pathname]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={
                    <Dashboard auth={auth}/>
                }/>
                <Route path="/restaurants" element={
                    <Restaurants auth={auth}/>
                }/>
                <Route path="/login" element={
                    <Login auth={auth}/>
                }/>
            </Routes>
            <LogoutButton auth={auth}/>
        </div>
    );
}

export default App;
