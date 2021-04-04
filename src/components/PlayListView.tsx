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
        <h1 className={"ui header inverted"} style={{marginTop: 10, marginLeft: 10}}>{playlist.name}</h1>
        <Segment basic>
            <Card.Group doubling centered>
                {(tracks.items).map((item: any, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <MusicCard image={item.track.album.images[0] && item.track.album.images[0].url}
                                       trackName={item.track.name}
                                       artist={item.track.artists[0].name}
                                       onClick={() => setCurrentSong(item.track)} id={item.track.id}/>
                        </React.Fragment>
                    )
                })}
            </Card.Group>
        </Segment>
    </div>);
};

const Entry = ({playlist, setCurrentSong}: PlayListView) => {
    if (!playlist) return null;

    return <PlayListView playlist={playlist} setCurrentSong={setCurrentSong}/>
};


export default Entry;