import React from "react";
import qs from "querystring";
import {Redirect, RouteComponentProps} from "react-router";
import {useDispatch} from "react-redux";

interface CallBack extends RouteComponentProps<any> {

}

const CallBack = ({history}: CallBack) => {
    const accessToken = qs.parse(history.location.hash)["#access_token"];
    const dispatch = useDispatch();
    dispatch({type: "LOGIN_USER", payload: accessToken});

    if (!accessToken) return <Redirect to={"/"}/>;
    localStorage.setItem("accessToken", accessToken as string);

    return <Redirect to={"/dashboard"}/>
};

export default CallBack;