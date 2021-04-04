import React, {useState} from "react";
import {Button, Card, Image} from "semantic-ui-react";

const onButtonClick = (icon: string, setIcon: any, setId: any, id: string) => {
    if (icon === "play") {
        setIcon("play")
    } else {
        setIcon("play")
    }

    setId(id);

};

const onMouseOut = (setIcon: any, setDisplay: any) => {
    setDisplay("block");
    // setTimeout(() => setIcon("play"), 1000);

};

interface MusicCard {
    image: string;
    trackName: string;
    artist: string;
    onClick: () => void;
    id: string;
}

const MusicCard = ({image, trackName, artist, onClick, id}: MusicCard) => {
    const [icon, setIcon] = useState("play");
    const [display, setDisplay] = useState("block");

    return (
        <Card style={{
            maxWidth: 168,
            maxHeight: 242,
            width: 168,
            height: 242,
            backgroundColor: "#282828",
            boxShadow: "0  0"
        }} onMouseOver={() => setDisplay("block")} onMouseOut={() => onMouseOut(setIcon, setDisplay)}>
            <Image src={image} wrapped ui fluid
                   style={{maxWidth: 137, marginTop: 15, height: 137, backgroundColor: "black"}} centered/>
            <Card.Content>
                <Card.Header style={{
                    textOverflow: "ellipsis",
                    color: "white",
                    width: 137,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    fontSize: 14
                }}>{trackName}</Card.Header>
                <Card.Meta>
                    <span className={"music-meta"}>{artist}</span>
                </Card.Meta>
                <Button circular color='green' icon={icon} floated={"right"} style={{display}}
                        onClick={() => onButtonClick(icon, setIcon, onClick, id)}/>
            </Card.Content>

        </Card>
    )
};

export default MusicCard;