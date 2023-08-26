import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const VideoFeed = () => {
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:4100');

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
