import React from "react";
import "../statics/player.css";


interface SpotifyPlayer {
    currentPlaylist: string;
}

const SpotifyPlayListPlayer = ({currentPlaylist}: SpotifyPlayer) => {

    return (
        <>
            <iframe className={"player"} src="https://open.spotify.com/embed/playlist/7lMXMXFRkJiPSz9JmU4NRH"
                    width="100%" height="80"
                    frameBorder="0" allow="encrypted-media"/>
        </>)
};

class PlaylistPlayer extends React.Component<SpotifyPlayer> {

    render() {
        return <SpotifyPlayListPlayer currentPlaylist={this.props.currentPlaylist}/>;
    }
}


export default PlaylistPlayer;
