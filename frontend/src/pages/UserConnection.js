import {useEffect, useState} from "react";
import {useWorkoutsContext} from "../hooks/useWorkoutsContext";
import {useAuthContext} from "../hooks/useAuthContext";

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutsForm from "../components/WorkoutForm";
import {Button, Form} from "react-bootstrap";

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

        const data = {mail, phone: phoneNumber, rasp_id}

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

    return(
        <div className="userConnection">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={mail} type="email" placeholder="Enter email" onChange={(e) => {setMail(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control value={phoneNumber} type="text" placeholder="079 888 77 77" onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
                {error && <div className="error">{error}</div> }
                {ok && <div className="ok">{ok}</div> }

            </Form>
        </div>
    )
}

export default UserConnection