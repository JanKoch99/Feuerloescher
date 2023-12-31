import React, {useEffect, useRef} from 'react';
import {config} from "../Constants";
import defaultImage from "../images/defaultimage.jpg"

const VideoFeed = () => {
    const socketRef = useRef();
    const URL = config.wsurl

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const debug=  queryParameters.get("debug")
        if (debug==="cTul2qVg9AViHLwjilIvUtqOZyQMDv") {
            socketRef.current = new WebSocket(`${URL}`);


            socketRef.current.onmessage = async (event) => {
                const imgElement = document.getElementById('videoFrame');
                imgElement.src = 'data:image/jpeg;base64,' + await event.data.text();
            };

            return () => {
                socketRef.current.close();
            };
        }
    });

    return (
        <img className="w-100 rounded-1" src={defaultImage} id="videoFrame" alt="Video Feed" />
    );
};

export default VideoFeed;
