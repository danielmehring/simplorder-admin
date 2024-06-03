import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createStore, Provider} from "jotai";
import axios from "axios";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
const store = createStore();

// TODO: change back before production
axios.defaults.baseURL = "https://europe-west3-custommenucards.cloudfunctions.net/api";
// axios.defaults.baseURL = "http://localhost:5000/custommenucards/europe-west3/api";


root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </Provider>
        </QueryClientProvider>
    </BrowserRouter>
);

reportWebVitals();
