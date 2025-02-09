import { FC, useState } from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../../Routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { userRegistration, useUserLoading } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import './Registration.css'

const RegistrationPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const loading = useUserLoading()
    const [passwordsMissmatch, setPasswordMissMatch] = useState(false)
    const navigate = useNavigate()
    
    const handleSubmit = async () => {
        if (password1 !== password2) {
            setPasswordMissMatch(true)
            return
        }
        await dispatch(userRegistration({email: email, password: password1}))
        navigate(ROUTES.ELEMENTS)
    }

    return (
        <Container className="w-100 rootContainer">
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.REGISTRATION}]}/>
            {loading ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </Row>
            ): (
                <Row>
                    <Col md={{span: 4, offset:4}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="registrationText">Адрес электронной почты</Form.Label>
                                <Form.Control className="registrationText" 
                                              type="email" 
                                              placeholder="Почта" 
                                              value={email} 
                                              onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="registrationText">Пароль</Form.Label>
                                <Form.Control className="registrationText" 
                                              type="password" 
                                              placeholder="Пароль" 
                                              value={password1}
                                              onChange={(e) => setPassword1(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="registrationText">Подтвердите пароль</Form.Label>
                                <Form.Control className="registrationText" 
                                              type="password" 
                                              placeholder="Подтвердите пароль" 
                                              value={password2}
                                              isInvalid={passwordsMissmatch} 
                                              onChange={(e) => setPassword2(e.target.value)}/>
                            </Form.Group>
                        </Form>
                        <Button variant="dark" 
                                type="submit" 
                                className="w-100 customButton" 
                                onClick={handleSubmit}>
                            Регистрация
                        </Button>
                    </Col>
                </Row>
            )}
        </Container>
    )
}
export default RegistrationPage