import {useEffect, useState} from "react";
import {Alert, Button, Card, FloatingLabel, Form} from "react-bootstrap";
import logo from "../images/logo.png"
import {config} from "../Constants";

const UserConnection = () => {
    const [mail, setMail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [rasp_id, setRasp_id] = useState('')
    const [ok, setOK] = useState(null)
    const [error, setError] = useState(null)
    const URL = config.url
    useEffect(() =>{
        const queryParameters = new URLSearchParams(window.location.search)
        const raspId = queryParameters.get("rasp_id")
        setRasp_id(raspId)
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mail === '' && phoneNumber === ''){
            setError('Mindestens einer der Felder muss ausgefüllt sein.')
        }

        else {
            const data = {mail, phone: phoneNumber.replace(/^\d/, match => match === '0' ? '+41' : match), rasp_id}

            const response = await fetch(`${URL}/api/rasp/userconnection`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setMail('')
                setPhoneNumber('')
                setRasp_id('')
                setOK('Saved Successfully')
                setError(null)
                console.log('new Raspi added', json)
            }
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center">
            <Card className="responsive-size mt-5 shadow-lg bg-primary">
                <Card.Body>
                    <div className="userConnection">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex just">
                                    <img src={logo} className="logo mt-2 mx-3"/>
                                </div>
                                <div className="col-12">
                                    <h1 className="mt-5 mx-3 fw-bold"><span className="text-secondary">Feuer</span><span className="text-danger">löscher</span></h1>
                                </div>
                                <div className="col-12">
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="my-5 mx-3" controlId="formBasicEmail">
                                            <FloatingLabel label="E-Mail-Adresse" controlId="mail" className="mb-3">
                                                <Form.Control value={mail} type="email" placeholder="Enter email" onChange={(e) => {setMail(e.target.value)}}/>
                                            </FloatingLabel>
                                        </Form.Group>

                                        <Form.Group className="my-5 mx-3" controlId="formBasicPassword">
                                            <FloatingLabel label="Handynummer" controlId="phoneNumber" className="mb-3">
                                                <Form.Control value={phoneNumber} type="text" placeholder="079 888 77 77" onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                                            </FloatingLabel>
                                        </Form.Group>
                                        {error &&
                                            <Alert key='danger' variant='danger' className="mx-3">
                                                <p className="mb-0">
                                                    {error}
                                                </p>
                                            </Alert>}
                                        {ok &&
                                            <Alert key='success' variant='success' className="mx-3">
                                                <p className="mb-0">
                                                    {ok}
                                                </p>
                                            </Alert>}
                                        <div className="d-flex my-5 mx-3">
                                            <Button variant="primary" type="submit" className="btn btn-secondary w-100 fs-5 py-3">
                                                Speichern
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserConnection