import React from "react";
import {useStore} from "react-redux";
import {play} from "../api/spotify";
import {Artiste, Track} from "../api/types";
import {Grid, Icon, Image, Progress} from "semantic-ui-react";
import Player from "./Player";

interface Props {
    accessToken: string;
    currentSong: Track;
}

interface State {
    deviceId: string;
    currentSongState: any;
    icon: any;

}

class SpotifyWeb extends React.Component<Props, State> {
    state: State = {deviceId: "", currentSongState: null, icon: "pause"};

    player: any;

    createPlayer = () => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = this.props.accessToken;

            // @ts-ignore
            this.player = new Spotify.Player({
                name: 'Lush Sounds',
                getOAuthToken: (cb: any) => {
                    cb(token);
                }
            });

            // Error handling
            this.player.addListener('initialization_error', ({message}: any) => {
                // console.error(message);
            });
            this.player.addListener('authentication_error', ({message}: any) => {
                // console.error(message);
            });
            this.player.addListener('account_error', ({message}: any) => {
                // console.error(message);
            });
            this.player.addListener('playback_error', ({message}: any) => {
                // console.error(message);
            });

            // Playback status updates
            this.player.addListener('player_state_changed', (state: any) => {
            });

            // Ready
            this.player.addListener('ready', ({device_id}: any) => {
                this.setState({deviceId: device_id});
            });

            // Not Ready
            this.player.addListener('not_ready', ({device_id}: any) => {
                console.log('Device ID has gone offline', device_id);
            });

            // Connect to the player!
            this.player.connect();
        }
    };

    componentDidMount(): void {
        this.createPlayer();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (prevState.deviceId === "") {
            this.player && this.player.pause();
        }
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        return nextState.deviceId !== this.state.deviceId || nextProps.currentSong.uri !== this.props.currentSong.uri;
    }

    render() {
        const {currentSong, accessToken} = this.props;

        if (this.state.deviceId !== "") {
            play(currentSong.uri, accessToken, this.state.deviceId);
        }


        localStorage.setItem("lastSong", JSON.stringify(currentSong));
        if (!this.player) return null;

        this.player.pause();
        return (
            <Grid columns={3}>
                <Grid.Column width={4}>
                    <Image size={"tiny"} floated={"left"}
                           src={currentSong.album.images[0] && currentSong.album.images[0].url}
                           style={{width: 56, height: 56}}/>
                    <div>
                        <div className={"header"}><strong>{currentSong.name}</strong></div>
                        <div className={"meta"} style={{
                            color: "#B3B3B3",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            fontSize: 11
                        }}>{currentSong.artists.map(a => a.name).join(", ")}</div>
                    </div>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Player player={this.player} currentSong={currentSong}/>
                </Grid.Column>
                <Grid.Column width={4}>

                </Grid.Column>

            </Grid>
        )
    }

}

interface SpotifyWebData {
    currentSong: Track;
}

const SpotifyWebData = ({currentSong}: SpotifyWebData) => {
    const state = useStore().getState();

    if (!currentSong) return null;

    return <SpotifyWeb accessToken={state.accessToken as string} currentSong={currentSong}/>
};

export default SpotifyWebData;