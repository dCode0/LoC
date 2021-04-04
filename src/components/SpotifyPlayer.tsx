import React from "react";
import "../statics/player.css";


interface SpotifyPlayer {
    currentSong: string;
}

const SpotifyPlayer = ({currentSong}: SpotifyPlayer) => {

    return null
};

class Play extends React.Component<SpotifyPlayer> {
    componentDidMount(): void {
        const play = document.querySelector("path");
        // @ts-ignore
    }

    render() {
        return (
            <>
                <iframe className={"player"} src={`https://open.spotify.com/embed/track/${this.props.currentSong}`}
                        width="100%" height="80"
                        frameBorder="0" allow="encrypted-media" title={"spotify"}/>
            </>
        );
    }
}


export default Play;
