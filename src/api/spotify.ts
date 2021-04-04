import axios from "axios";
import {useEffect, useState} from "react";
import {User} from "./types";
import {useDispatch} from "react-redux";

export default axios.create({
    baseURL: "https://api.spotify.com/v1"
});
const CLIENT_ID = "ffc99ff751204e43b490cb9073d04b07";
const REDIRECT_URI = process.env.REACT_APP_CALLBACK_URL as string;
const scope = "user-read-private user-read-email streaming " +
    "playlist-read-private playlist-read-collaborative " +
    "user-top-read user-modify-playback-state";

export const params = new URLSearchParams({
    response_type: 'token',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
});

export const useGetUser = (code: string) => {

    const [user, setUser] = useState<User>();
    const dispatch = useDispatch();

    useEffect(() => {
        axios({
            url: "https://api.spotify.com/v1/me",
            headers: {
                'Authorization': 'Bearer ' + code
            }
        }).then(response => {
            dispatch({type: "GET_USER", payload: response.data});
            setUser(response.data);
        }).catch(e => {
            window.location.assign("/");
        })
    }, [dispatch, code]);

    return user;
};

export const useGetQuery = (query: string, code: String) => {
    const [result, setResult] = useState();

    useEffect(() => {
        if (query) {
            axios.get("https://api.spotify.com/v1/search", {
                params: {
                    q: query,
                    type: "artist,album,track",
                    limit: 50
                },
                headers: {
                    'Authorization': 'Bearer ' + code
                }
            }).then(response => {
                setResult(response.data)
            }).catch((e: Error) => {
                if (e.message.includes("4")) {
                    window.location.assign("https://accounts.spotify.com/authorize?" + params.toString());
                }
            })
        }
    }, [query, code]);

    return result;
};

export const useGetPlaylist = (userId: string, code: string) => {
    const [playlist, setPlaylist] = useState();

    useEffect(() => {
        axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
                'Authorization': 'Bearer ' + code
            }
        }).then(response => setPlaylist(response.data))
            .catch((e: Error) => {
                if (e.message.includes("4")) {
                    window.location.assign("https://accounts.spotify.com/authorize?" + params.toString());
                }
            });
    }, [userId, code]);

    return playlist;

};

export const useGetPlaylistTracks = (playlistId: string, code: string) => {
    const [tracks, setPlaylistTracks] = useState();

    useEffect(() => {
        axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                'Authorization': 'Bearer ' + code
            }
        }).then(response => setPlaylistTracks(response.data))
            .catch((e: Error) => {
                if (e.message.includes("4")) {
                    window.location.assign("https://accounts.spotify.com/authorize?" + params.toString());
                }
            });
    }, [playlistId, code]);

    return tracks;

};

export const useGetUserTopTracks = (code: string) => {
    const [topTracks, setTopTracks] = useState();

    useEffect(() => {
        axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
                'Authorization': 'Bearer ' + code
            }
        })
            .then(response => setTopTracks(response.data))
            .catch((e: Error) => {
                if (e.message.includes("4")) {
                    window.location.assign("https://accounts.spotify.com/authorize?" + params.toString());
                }
            });

    }, [code]);

    return topTracks;
};

export const play = (track: string, code: string, deviceId: string) => {
    axios.put("https://api.spotify.com/v1/me/player/play", {
        uris: [track]
    }, {
        headers: {
            'Authorization': 'Bearer ' + code
        },
        params: {
            device_id: deviceId
        }
    }).catch((e: Error) => {
        if (e.message.includes("4")) {
            window.location.assign("https://accounts.spotify.com/authorize?" + params.toString());
        }
    });
};