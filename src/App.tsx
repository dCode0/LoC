import React from 'react';
import './App.css';
import HomeScreen from "./components/screens/HomeScreen";
import {BrowserRouter, Route} from "react-router-dom";
import DashBoard from "./components/screens/DashBoard";
import CallBack from "./api/CallBack";
import {useDispatch} from "react-redux";
import SpotifyWeb from "./components/SpotifyWeb";
import {play} from "./api/spotify";

const App: React.FC = () => {
    const currentSong = JSON.parse(localStorage.getItem("lastSong") as string);
    useDispatch()({type: "LOGIN_USER", payload: localStorage.getItem("accessToken")});
    useDispatch()({type: "GET_LAST_SONG", payload: currentSong && currentSong});
    return (
        <BrowserRouter>
            <Route path={"/dashboard"} exact component={DashBoard}/>
            <Route path={"/callback"} exact component={CallBack}/>
            <Route path={"/player"} exact component={SpotifyWeb}/>
            <Route path={"/"} exact component={HomeScreen}/>
        </BrowserRouter>
    );
};

export default App;
