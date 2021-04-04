import {combineReducers} from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import lastSongReducer from "./lastSongReducer";

export default combineReducers({
    accessToken: authReducer,
    user: userReducer,
    lastSong: lastSongReducer,
});