import React from "react";
import NavBar from "../NavBar";
import bg from "../../statics/bg.jpg";
import {Button, Container, Grid, Header, Icon} from "semantic-ui-react";
import {params} from "../../api/spotify";


const onClick = () => {
    window.location.assign("https://accounts.spotify.com/authorize?" + params.toString())
};

const HomeScreen = () => {
    return (
        <div>
            <header style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(255, 0, 0, 0.45)), url(${bg}) no-repeat center`,
                height: "100vh"
            }}>
                <NavBar/>
                <Container textAlign={"center"}>
                    <Grid verticalAlign={"middle"} style={{height: "80vh"}}>
                        <Grid.Column>
                            <Header style={{fontSize: 96, fontWeight: 300}} inverted>Music for
                                Everyone</Header>
                            <p style={{font: "monospace", fontSize: 20, color: "white"}}>All your Music in one place</p>
                            <Button color={"green"} size={"massive"} onClick={onClick}>
                                <Icon name={"spotify"}/>Sign in with Spotify
                            </Button>
                        </Grid.Column>
                    </Grid>

                </Container>
            </header>
        </div>
    )
};

export default HomeScreen;