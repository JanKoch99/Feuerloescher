import {useEffect, useState} from "react";
import {Button, Card, FloatingLabel, Form} from "react-bootstrap";
import logo from "../images/logo.png"

const UserConnection = () => {
    const [mail, setMail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [rasp_id, setRasp_id] = useState('')
    const [ok, setOK] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() =>{
        const queryParameters = new URLSearchParams(window.location.search)
        const raspId = queryParameters.get("rasp_id")
        setRasp_id(raspId)
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mail === '' && phoneNumber === ''){
            setError('At least one field must be filled')
        }

        else {
            const data = {mail, phone: phoneNumber.replace(/^\d/, match => match === '0' ? '+41' : match), rasp_id}

            const response = await fetch('/api/rasp/userconnection', {
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
            <Card className="w-50 mt-5 shadow-lg bg-primary">
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
                                            <FloatingLabel label="Email address" controlId="mail" className="mb-3">
                                                <Form.Control value={mail} type="email" placeholder="Enter email" onChange={(e) => {setMail(e.target.value)}}/>
                                            </FloatingLabel>
                                        </Form.Group>

                                        <Form.Group className="my-5 mx-3" controlId="formBasicPassword">
                                            <FloatingLabel label="Phone Number" controlId="phoneNumber" className="mb-3">
                                                <Form.Control value={phoneNumber} type="text" placeholder="079 888 77 77" onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                                            </FloatingLabel>
                                        </Form.Group>
                                        <div className="d-flex my-5 mx-3">
                                            <Button variant="primary" type="submit" className="btn btn-secondary w-100 fs-5 py-3">
                                                Speichern
                                            </Button>
                                        </div>
                                        {error && <div className="bg-danger">{error}</div> }
                                        {ok && <div className="bg-success">{ok}</div> }

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