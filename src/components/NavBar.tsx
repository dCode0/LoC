import React from "react";
import {Header, Menu} from "semantic-ui-react";

const NavBar = () => {

    return (
        <Menu inverted style={{borderRadius: 0}} borderless>
            <Menu.Item>
                <img src={"https://react.semantic-ui.com/logo.png"} alt={""}/>
            </Menu.Item>
            <Menu.Item>
                <Header inverted>LushSounds<sup>TM</sup></Header>
            </Menu.Item>
            <Menu.Menu position={"right"}>
                <Menu.Item>
                    {/*<LoginButton/>*/}
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )

};

export default NavBar;