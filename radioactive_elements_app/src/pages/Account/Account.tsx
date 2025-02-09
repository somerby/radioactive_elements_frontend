import { FC, useState } from "react";
import { Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from "../../Routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { userAccount, useUserLoading, useEmail } from "../../slices/userSlice";
import './Account.css'

const AccountPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState(useEmail())
    const [password, setPassword] = useState('')
    const loading = useUserLoading()
    
    const handleSubmit = async () => {
        await dispatch(userAccount({email: email, password: password}))
    }

    return (
        <Container className="w-100 rootContainer">
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ACCOUNT}]}/>
            {loading ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </Row>
            ): (
                <Row>
                    <Col md={{span: 4, offset:4}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="accountText">Введите новый адрес электронной почты</Form.Label>
                                <Form.Control className="accountText" 
                                              type="email" 
                                              placeholder="Почта" 
                                              value={email} 
                                              onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="accountText">Введите новый пароль</Form.Label>
                                <Form.Control className="accountText" 
                                              type="password" 
                                              placeholder="Пароль" 
                                              value={password} 
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Form>
                        <Button variant="dark" 
                                type="submit" 
                                className="w-100 customButton" 
                                onClick={handleSubmit}>
                            Изменить
                        </Button>
                    </Col>
                </Row>
            )}
        </Container>
    )
}
export default AccountPage