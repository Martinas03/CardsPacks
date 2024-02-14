import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Login from "./components/login/Login";
import {Register} from "./components/registration/Register";
import {Main} from "./components/Auth/Main";
import Pack from "./components/packs/Pack";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export function App() {

    const userId = useSelector<AppRootStateType, string>(state => state.auth.user._id);

    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/cards/:userId'} element={<Pack/>}/>
            </Routes>
        </div>
    );
}


