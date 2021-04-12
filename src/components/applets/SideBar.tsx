import React from "react";
import {Divider, Icon, Image, Menu, Sidebar} from "semantic-ui-react";
import {Playlist} from "../../api/types";
import {useStore} from "react-redux";

interface SideBar {
    playlists: any;
    setCurrentPlaylist: any;
    setCurrentView: any;
}

const onPlaylistClick = (playlist: Playlist, setCurrentPlaylist: any, setCurrentView: any) => {
    setCurrentView("");
    setCurrentPlaylist(playlist);
    setTimeout(() => setCurrentView("playlistView"), 0);
};

const SideBar = ({playlists, setCurrentPlaylist, setCurrentView}: SideBar) => {
    const user = useStore().getState().user;


    return (
        <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            vertical
            visible
            style={{width: 230, maxHeight: "95vh", backgroundColor: "black"}}
            borderless
        >
            <Menu.Item as={"a"} href={"/dashboard"}>
                <Image src={"https://react.semantic-ui.com/logo.png"} alt={""} size={"mini"} spaced={"right"}
                       centered/> <strong>LushSounds<sup>TM</sup></strong>
            </Menu.Item>
            <Menu.Item as={"a"} onClick={() => setCurrentView("homeView")}>
                <span style={{fontSize: 24}}><Icon name='home' size={"small"} inverted/>Home</span>
            </Menu.Item>
            <Menu.Item as='a' onClick={() => setCurrentView("searchView")}>
                <span style={{fontSize: 24}}><Icon name='search' size={"small"}/>Search</span>
            </Menu.Item>
            <Menu.Item as='a' onClick={() => setCurrentView("libraryView")}>
                <span style={{fontSize: 24}}><Icon name='list' size={"small"}/>Library</span>
            </Menu.Item>
            <Divider hidden/>
            <Menu.Item>
                <span style={{fontSize: 15}}>Playlists</span>
            </Menu.Item>
            <Menu.Item>
                <Menu.Item link><span className={"link"}><Icon name={"plus"} link/>Create Playlist</span></Menu.Item>
                <div style={{
                    marginTop: 10,
                    maxHeight: 450,
                    height: 450,
                    overflow: "auto"
                }}>
                    <Menu.Menu>
                        {playlists.items.map((playlist: Playlist) => {
                            return (
                                <Menu.Item link key={playlist.id}
                                           onClick={() => onPlaylistClick(playlist, setCurrentPlaylist, setCurrentView)}>
                                    {playlist.name}
                                </Menu.Item>
                            )
                        })}
                    </Menu.Menu>
                </div>
            </Menu.Item>
            <Menu.Item style={{position: "fixed", bottom: "5vh"}}>
                <img className="ui avatar image" src={user.images[0] && user.images[0].url}
                     alt={""}/>
                <strong>{user && user.display_name}</strong>
            </Menu.Item>
        </Sidebar>
    )

};

export default SideBar;