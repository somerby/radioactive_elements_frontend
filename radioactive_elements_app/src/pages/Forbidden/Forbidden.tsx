import { FC } from "react";
import { Container } from "react-bootstrap";
import './Forbidden.css'

const ForbiddenPage: FC = () => {
    return (
        <Container className="w-100 rootContainer">
            <div className="d-flex justify-content-center">
                <h1 className="forbiddenLabel">Отказано в доступе</h1>
            </div>
        </Container>
    )
}
export default ForbiddenPage