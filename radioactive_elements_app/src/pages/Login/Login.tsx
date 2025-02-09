import { FC, useState } from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../../Routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { userLogin, useUserLoading } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import './Login.css'

const LoginPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginFailed, setLoginFailed] = useState(false)
    const loading = useUserLoading()
    const navigate = useNavigate()
    
    const handleSubmit = async () => {
        const result = await dispatch(userLogin({email: email, password: password}))
        if (result.type === 'user/userLogin/rejected') {
            setLoginFailed(true)
            return
        }
        navigate(ROUTES.ELEMENTS)
    }

    return (
        <Container className="w-100 rootContainer">
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.LOGIN}]}/>
            {loading ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </Row>
            ): (
                <Row>
                    <Col md={{span: 4, offset:4}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="loginText">Адрес электронной почты</Form.Label>
                                <Form.Control className="loginText" 
                                              type="email" 
                                              placeholder="Почта" 
                                              value={email} 
                                              onChange={(e) => setEmail(e.target.value)}
                                              isInvalid={loginFailed}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="loginText">Пароль</Form.Label>
                                <Form.Control className="loginText" 
                                              type="password" 
                                              placeholder="Пароль" 
                                              value={password} 
                                              onChange={(e) => setPassword(e.target.value)}
                                              isInvalid={loginFailed}/>
                            </Form.Group>
                        </Form>
                        <Button variant="dark" 
                                type="submit" 
                                className="w-100 customButton" 
                                onClick={handleSubmit}>
                            Вход
                        </Button>
                    </Col>
                </Row>
            )}
        </Container>
    )
}
export default LoginPage