import React from "react";
import {Card, Container, Icon, Input, Segment} from "semantic-ui-react";
import {Track} from "../api/types";
import MusicCard from "./applets/MusicCard";

interface SearchView {
    setSearchValue: any;
    result: any;
    setCurrentSong: any;
    value: string
}

const SearchList = (props: SearchView) => {

    return (
        <>
            <Container style={{marginTop: 10}}>
                <Input icon placeholder='Search...' fluid>
                    <input style={{borderRadius: 500}} type={"text"}
                           value={props.value}
                           onChange={(e: any) => props.setSearchValue(e.target.value)}
                           placeholder={"Search for Artists, Albums and Tracks."}
                    />
                    <Icon name='search'/>
                </Input>
                {props.value.trim() &&
                <h1 className={"ui header inverted"} style={{marginTop: 10, marginLeft: 10}}>Showing songs
                    for "{props.value}"</h1>}
            </Container>

            <Segment basic>
                <Card.Group centered doubling>
                    {(props.result.tracks.items as Track[]).map(track => {
                        return (
                            <React.Fragment key={track.id}>
                                <MusicCard image={track.album.images[0] && track.album.images[0].url}
                                           trackName={track.name}
                                           artist={track.artists[0].name}
                                           onClick={() => props.setCurrentSong(track)} id={track.id}/>
                            </React.Fragment>
                        )
                    })}
                </Card.Group>
            </Segment>
        </>
    )

};

export default SearchList;