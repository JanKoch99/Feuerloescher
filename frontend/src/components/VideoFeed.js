import React, { useEffect, useRef } from 'react';
import {config} from "../Constants";

const VideoFeed = () => {
    const socketRef = useRef();
    const URL = config.wsurl

    useEffect(() => {
        socketRef.current = new WebSocket(URL);

        socketRef.current.onmessage = async (event) => {
            const imgElement = document.getElementById('videoFrame');
            imgElement.src = 'data:image/jpeg;base64,' + await event.data.text();
        };

        return () => {
            socketRef.current.close();
        };
    }, []);

    return (
        <div>
            <img id="videoFrame" alt="Video Feed" />
        </div>
    );
};

export default VideoFeed;
