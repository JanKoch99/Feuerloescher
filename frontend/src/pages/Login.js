import {useState} from "react";
import {useLogin} from "../hooks/useLogin";
import {Alert, Button, Card, FloatingLabel, Form} from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Card className="responsive-size m-3 shadow-lg bg-primary">
                <Card.Body>
                    <div className="login">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="fw-bold text-center">Log in</h3>
                                </div>
                            </div>
                            <Form className="login" onSubmit={handleSubmit}>
                                <Form.Group className="my-3 mx-3" controlId="formBasicEmail">
                                    <FloatingLabel label="E-Mail" controlId="mail" className="mb-3">
                                        <Form.Control value={email} type="email" onChange={(e) => {setEmail(e.target.value)}}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="my-3 mx-3" controlId="formBasicEmail">
                                    <FloatingLabel label="Password" controlId="password" className="mb-3">
                                        <Form.Control value={password} type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                                    </FloatingLabel>
                                </Form.Group>

                                {error &&
                                    <Alert key='danger' variant='danger' className="mx-3">
                                        <p className="mb-0">
                                            {error}
                                        </p>
                                    </Alert>}
                                <div className="d-flex flex-column my-5 mx-3">
                                    <Button variant="primary" disabled={isLoading} type="submit" className="btn btn-secondary w-100 fs-5 py-3">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>

    )
}

export default Login