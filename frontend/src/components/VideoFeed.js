import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const VideoFeed = () => {
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('ws://localhost:4000/ws');

        socketRef.current.on('videoFrame', (frameData) => {
            const imgElement = document.getElementById('videoFrame');
            imgElement.src = 'data:image/jpeg;base64,' + frameData;
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <div>
            <img id="videoFrame" alt="Video Feed" />
        </div>
    );
};

export default VideoFeed;
