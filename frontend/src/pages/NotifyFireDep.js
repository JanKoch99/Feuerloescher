import {useEffect, useState} from "react";
import VideoFeed from "../components/VideoFeed";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFireAlt} from "@fortawesome/free-solid-svg-icons/faFireAlt";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {Card} from "react-bootstrap";


const NotifyFireDep = () => {
    const [rasp_id, setRasp_id] = useState('')
    useEffect(() =>{
        const queryParameters = new URLSearchParams(window.location.search)
        const raspId = queryParameters.get("rasp_id")
        setRasp_id(raspId)
    },[])


    return (
        <div className="d-flex justify-content-center align-items-center">
            <Card className="w-50 mt-5 shadow-lg">
                <Card.Body>
                    <div className="containery">
                        <div className="row">
                            <h2 className="text-center">Du bist erfolgreich dem Link gefolgt.</h2>
                        </div>

                        <div className="row mt-5">
                            <h2 className="text-center">Bestätige durch den Video-feed ob es sich tatsächlich um ein Feuer handelt.</h2>
                        </div>

                        <div className="row mt-5">
                            <VideoFeed/>
                        </div>

                        <div className="row mt-2">
                            TODO: Videofeed
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 col-lg-6">
                                <a className="btn btn-secondary w-100 ps-0 ps-lg-2"><FontAwesomeIcon icon={faFireAlt} size="4x" /><p>Feuerwehr anrufen</p></a>
                            </div>
                            <div className="col-12 col-lg-6 mt-3 mt-lg-0">
                                <a className="btn btn-success w-100 pe-0 pe-lg-2"><FontAwesomeIcon icon={faTimes} size="4x" /><p>Kein Brand gesehen</p></a>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

        </div>
    )
}

export default NotifyFireDep