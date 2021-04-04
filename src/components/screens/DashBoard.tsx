import React, {useState} from "react";
import {Segment, Sidebar} from "semantic-ui-react";
import {useStore} from "react-redux";
import {useGetPlaylist, useGetQuery, useGetUser, useGetUserTopTracks} from "../../api/spotify";
import {Result, User} from "../../api/types";
import SideBar from "../applets/SideBar";
import SearchView from "../SearchView";
import PlayListView from "../PlayListView";
import HomeView from "../HomeView";
import SpotifyWeb from "../SpotifyWeb";

const DashBoard = () => {
    const state = useStore().getState();
    const user: User = state.user;


    const playlists = useGetPlaylist(user.id, state.accessToken);
    const topTracks = useGetUserTopTracks(state.accessToken);
    const [currentPlaylist, setCurrentPlaylist] = useState();

    const [searchValue, setSearchValue] = useState("wizkid");
    const result: Result = useGetQuery(searchValue, state.accessToken);
    const [currentSong, setCurrentSong] = useState(JSON.parse(localStorage.getItem("lastSong") as string));

    const [currentView, setCurrentView] = useState<string>("homeView");

    if (result === undefined || playlists === undefined || topTracks === undefined) return null;

    const views: any = {
        searchView: (<SearchView setSearchValue={setSearchValue} result={result} setCurrentSong={setCurrentSong}
                                 value={searchValue}/>),
        playlistView: (<PlayListView playlist={currentPlaylist} setCurrentSong={setCurrentSong}/>),
        homeView: (<HomeView setCurrentSong={setCurrentSong} top={topTracks}/>),
    };


    return (
        <>
            <SideBar playlists={playlists} setCurrentPlaylist={setCurrentPlaylist} setCurrentView={setCurrentView}/>
            <div>
                <Sidebar.Pusher style={{
                    marginLeft: 230,
                    backgroundColor: "#121212",
                    height: "90vh",
                    maxHeight: "90vh",
                    overflow: "auto"
                }}>
                    <div>
                        {views[currentView]}
                    </div>
                </Sidebar.Pusher>
                <Segment inverted
                         style={{
                             height: "10vh",
                             postion: "fixed",
                             zIndex: 1000,
                             left: 0,
                             width: "100%",
                             bottom: 0,
                             border: 0
                         }}
                         attached={"bottom"} raised basic>
                    <SpotifyWeb currentSong={currentSong}/>
                </Segment>

            </div>


        </>

    )
};

const UserWrapper = () => {
    const state = useStore().getState();
    const user: User | undefined = useGetUser(state.accessToken);

    if (user === undefined) return null;

    return <DashBoard/>
};

export default UserWrapper;