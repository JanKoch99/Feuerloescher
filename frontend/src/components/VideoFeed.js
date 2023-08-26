import React, {useEffect, useRef, useState} from 'react';
import {config} from "../Constants";

const VideoFeed = () => {
    const socketRef = useRef();
    const URL = config.wsurl

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const debug=  queryParameters.get("debug")
        console.log(URL + "?debug=" + debug)
        socketRef.current = new WebSocket(URL + "?debug=" + debug);

        socketRef.current.onmessage = async (event) => {
            const imgElement = document.getElementById('videoFrame');
            imgElement.src = 'data:image/jpeg;base64,' + await event.data.text();
        };

        return () => {
            socketRef.current.close();
        };
    }, []);

    return (
        <img className="w-100" id="videoFrame" alt="Video Feed" />
    );
};

export default VideoFeed;
