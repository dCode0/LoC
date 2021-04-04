import React from "react";
import {Card, Segment} from "semantic-ui-react";
import {Track} from "../api/types";
import MusicCard from "./applets/MusicCard";

interface HomeView {
    top: any;
    setCurrentSong: any;
}

const HomeView = (props: HomeView) => {

    return (
        <>
            <h1 className={"ui header inverted"} style={{marginTop: 10, marginLeft: 10}}>Top Tracks</h1>
            <Segment basic style={{paddingBottom: 200}}>
                <Card.Group doubling centered>
                    {(props.top.items).map((track: Track) => {
                        return (
                            <MusicCard key={track.id} image={track.album.images[0] && track.album.images[0].url}
                                       trackName={track.name}
                                       artist={track.artists[0].name}
                                       onClick={() => props.setCurrentSong(track)} id={track.id}/>
                        )
                    })}
                </Card.Group>
            </Segment>
        </>
    )

};

export default HomeView;