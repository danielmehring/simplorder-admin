import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createStore, Provider} from "jotai";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
const store = createStore();

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
