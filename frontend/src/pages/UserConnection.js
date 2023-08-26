import {useEffect, useState} from "react";
import {Button, FloatingLabel, Form} from "react-bootstrap";

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
    }

    return(
        <div className="userConnection">
           <div className="container">
               <div className="row">
                   <div className="d-none d-lg-block col-lg-3"></div>
                   <div className="col-12 col-lg-6">
                       <Form onSubmit={handleSubmit}>
                           <Form.Group className="mb-3" controlId="formBasicEmail">
                               <FloatingLabel label="Email address" controlId="mail" className="mb-3">
                                   <Form.Control value={mail} type="email" placeholder="Enter email" onChange={(e) => {setMail(e.target.value)}}/>
                               </FloatingLabel>
                           </Form.Group>

                           <Form.Group className="mb-3" controlId="formBasicPassword">
                               <FloatingLabel label="Phone Number" controlId="phoneNumber" className="mb-3">
                                <Form.Control value={phoneNumber} type="text" placeholder="079 888 77 77" onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                               </FloatingLabel>
                           </Form.Group>
                           <Button variant="primary" type="submit" className="btn btn-primary w-100">
                               Save
                           </Button>
                           {error && <div className="error">{error}</div> }
                           {ok && <div className="ok">{ok}</div> }

                       </Form>
                   </div>
                   <div className="d-none d-lg-block col-lg-3"></div>
               </div>
           </div>
        </div>
    )
}

export default UserConnection