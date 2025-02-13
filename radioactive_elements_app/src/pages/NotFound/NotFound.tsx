import { FC } from "react";
import { Container } from "react-bootstrap";
import './NotFound.css'

const NotFoundPage: FC = () => {
    return (
        <Container className="w-100 rootContainer">
            <div className="d-flex justify-content-center">
                <h1 className="mx-auto notFoundLabel">Не найдено</h1>
            </div>
        </Container>
    )
}
export default NotFoundPage