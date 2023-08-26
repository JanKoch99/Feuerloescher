import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import VideoFeed from "../components/VideoFeed";

const NotifyFireDep = () => {
    const [rasp_id, setRasp_id] = useState('')
    useEffect(() =>{
        const queryParameters = new URLSearchParams(window.location.search)
        const raspId = queryParameters.get("rasp_id")
        setRasp_id(raspId)
    },[])


    return (
        <>
            <p>Du bist erfolgreich dem Link gefolgt</p>
            <p>Bestätige durch den Video-feed ob es sich tatsächlich um ein Feuer handelt.</p>
            <VideoFeed/>
            <p><a href="tel:">Feuerwehr anrufen</a></p>
        </>
    )
}

export default NotifyFireDep