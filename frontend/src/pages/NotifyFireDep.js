import {useEffect, useState} from "react";
import VideoFeed from "../components/VideoFeed";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFireAlt} from "@fortawesome/free-solid-svg-icons/faFireAlt";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {Card} from "react-bootstrap";
import logo from "../images/logo.svg";


const NotifyFireDep = () => {
    const [rasp_id, setRasp_id] = useState('')
    useEffect(() =>{
        const queryParameters = new URLSearchParams(window.location.search)
        const raspId = queryParameters.get("rasp_id")
        setRasp_id(raspId)
    },[])


    return (
        <div className="d-flex justify-content-center align-items-center">
            <Card className="responsive-size m-3 shadow-lg bg-primary">
                <Card.Body>
                    <div className="containery">
                        <div className="row">
                            <div className="col-12 d-flex just">
                                <img src={logo} className="logo mt-3 mx-3"/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <h2 className="text-center text-secondary fw-bold">Handelt es sich um einen Fehlalarm?</h2>
                        </div>

                        <div className="row mt-4 mx-3">
                            <div className="col-12 d-flex justify-content-center align-items-center">
                                <div className="videofeed">
                                    <VideoFeed/>
                                </div>
                            </div>

                        </div>
                        <div className="row mt-5 mb-3 mx-3">
                            <div className="col-12 d-flex justify-content-between">
                                <a href="tel:144"className="btn btn-secondary w-48 d-flex justify-content-between align-items-center flex-column"><FontAwesomeIcon icon={faFireAlt} size="4x" style={{fontSize: 53, marginTop:5}} /><p className="mt-1 p-0 m-0">Notfall melden</p></a>
                                <a className="btn btn-success w-48 d-flex justify-content-between align-items-center flex-column"><FontAwesomeIcon icon={faTimes} size="4x" /><p className="mt-1 p-0 m-0">Fehlalarm</p></a>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

        </div>
    )
}

export default NotifyFireDep