import React from "react";
import {useGetPlaylistTracks} from "../api/spotify";
import {useStore} from "react-redux";
import {Card, Segment} from "semantic-ui-react";
import {Playlist} from "../api/types";
import MusicCard from "./applets/MusicCard";

interface PlayListView {
    playlist: Playlist;
    setCurrentSong: any;
}

const PlayListView = ({playlist, setCurrentSong}: PlayListView) => {
    const tracks = useGetPlaylistTracks(playlist.id, useStore().getState().accessToken);
    console.log(tracks);
    if (tracks === undefined) return null;

    return (<div>
       <h1>Coming Soon...</h1>
    </div>);
};

const Entry = ({playlist, setCurrentSong}: PlayListView) => {
    if (!playlist) return null;

    return <PlayListView playlist={playlist} setCurrentSong={setCurrentSong}/>
};


export default Entry;