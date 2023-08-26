import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const VideoFeed = () => {
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:5000');

        socketRef.current.onmessage = (event) => {
            const imgElement = document.getElementById('videoFrame');
            imgElement.src = 'data:image/jpeg;base64,' + event.data;
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
