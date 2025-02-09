import { FC, useEffect } from 'react'
import { Col, Container, Row, Image, Spinner} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { getElementWithId } from '../../slices/elementSlice';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../Routes';
import defaultImg from '/default.jpg'
import './Element.css'
import { useElement, useElementLoading } from '../../slices/elementSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

const ElementPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const elementContent = useElement()
    const loading = useElementLoading()
    const {elementId} = useParams();

    const loadContent = async () => {
        await dispatch(getElementWithId(elementId!))
    }

    useEffect(() => {
        loadContent();
    }, [])

    return (
        <Container className='w-100 rootContainer'>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ELEMENTS, path: ROUTES.ELEMENTS}, {label: elementContent?.name}]}/>

            {loading ? (
                <div  className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </div>
            ) : (
                <>
                    <Row>
                        <Col md={4} xs={3}>
                            <Image src={elementContent?.img_url || defaultImg} fluid/>
                        </Col>
                        <Col md={8} xs={9}>
                            <h1 className='elementName'>{elementContent?.name}</h1>
                            <p className='elementPeriodTime' dangerouslySetInnerHTML={{__html: elementContent?.period_time_text}}/>
                        </Col>
                    </Row>
                    <Row>
                        <p className='elementDescription' dangerouslySetInnerHTML={{__html: elementContent?.description}}/>
                    </Row>
                </>
            )}
        </Container>
    )
}
export default ElementPage;