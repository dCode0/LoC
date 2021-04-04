import {Container, Grid, Icon, Input, Progress, Segment} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {play} from "../api/spotify";
import {useStore} from "react-redux";

const time: any = {position: 0, duration: 0};

const msToMinutesAndSeconds = (ms: number) => {
    const seconds = parseInt(((ms / 1000) % 60).toString());
    const minutes = parseInt(((ms / (1000 * 60)) % 60).toString());
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

interface Props extends Player {
    lastSong: any;
}

interface State {
    value: number;
    icon: string;
    duration: number;
    position: number;
    interval: any;
    paused: boolean;
    status: string;
}

class PlayerMain extends React.Component<Props, State> {
    state: any = {
        value: 0,
        icon: "pause",
        interval: null,
        duration: 0,
        position: 0,
        paused: false,
        status: "not_playing"
    };

    handlePauseClick = () => {
        this.setState({status: "playing"});
        this.setState({icon: (this.state.icon === "pause") ? "play" : "pause"});
        this.props.player.togglePlay();
    };


    handlePlay = () => {
        this.props.player.getCurrentState()
            .then((state: any) => {
                if (state) {
                    this.setState({
                        value: state.position * 100 / state.duration,
                        duration: state.duration,
                        position: state.position
                    });
                    if (state.paused) {
                        this.setState({icon: "play"});
                    } else {
                        this.setState({icon: "pause"});
                    }
                    this.setState({paused: state.paused})
                }
            });
    };

    handleSeek = (value: any) => {
        const percentage = ((parseFloat(value) / 100) * this.state.duration);
        this.props.player.seek(percentage).then(() => this.setState({value: parseFloat(value)}));
    };

    componentDidMount(): void {
        const interval = setInterval(this.handlePlay, 1000);
        this.setState({interval: interval});
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        const {lastSong, player, currentSong} = this.props;
        if (lastSong && currentSong && lastSong.id === currentSong.id && this.state.status === "not_playing") {
            player.pause();
        } else {
            if (prevState.status !== "playing") {
                this.setState({status: "playing"});
            }
        }
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        return !this.state.paused;
    }

    componentWillUnmount(): void {
        clearInterval(this.state.interval)
    }

    render() {
        return (
            <div>
                <Container textAlign={"center"} fluid>
                    <Grid columns={3} container>
                        <Grid.Column width={1} style={{padding: 7}}>
                            <span className={"music-meta"}>{msToMinutesAndSeconds(this.state.position)}</span>
                        </Grid.Column>
                        <Grid.Column width={14} style={{padding: 7}}>
                            <input
                                type="range"
                                step="any"
                                max={100}
                                value={this.state.value}
                                onChange={(e: any) => this.handleSeek(e.target.value)}
                                style={{width: "100%", color: "green"}}
                            />

                            <Icon name={"arrow left"} size={"big"} circular/>
                            <Icon name={this.state.icon} size={"big"} onClick={this.handlePauseClick}
                                  circular/>
                            <Icon name={"arrow right"} size={"big"} circular/>
                        </Grid.Column>
                        <Grid.Column width={1} style={{padding: 7}}>
                            <span className={"music-meta"}>{msToMinutesAndSeconds(this.state.duration)}</span>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

interface Player {
    player: any;
    currentSong: any;
}

const Player = ({player, currentSong}: Player) => {
    const lastSong = useStore().getState().lastSong;

    return <PlayerMain player={player} lastSong={lastSong} currentSong={currentSong}/>
};

export default Player;