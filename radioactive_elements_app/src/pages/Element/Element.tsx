import { FC, useEffect, useState } from 'react'
import { Col, Container, Row, Image, Spinner} from "react-bootstrap";
import { ElementInf } from '../../modules/Api';
import { useParams } from 'react-router-dom';
import { getElementWithId } from '../../modules/Api';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../Routes';
import defaultImg from '/default.jpg'
import './Element.css'
import mockElements from '../../modules/Mock';

const defaultElement: ElementInf = {element_id: 0, 
                    name: '',
                    description: '',
                    status: '',
                    img_url: '',
                    period_time_text: '',
                    period_time: 0,
                    atomic_mass: 0}

const ElementPage: FC = () => {
    const [elementContent, setElementContent] = useState<ElementInf>(defaultElement);
    const [loading, setLoading] = useState(false)
    const {elementId} = useParams();

    const loadContent = async () => {
        if (!elementId) return;
        setLoading(true)
        getElementWithId(elementId).then((response) => {
                setElementContent(response)
                setLoading(false)
            }).catch(() => {
                setElementContent(mockElements.elements.find((el) => el.element_id.toString() === elementId) || defaultElement)
                setLoading(false)
            })
    }

    useEffect(() => {
        loadContent();
    }, [])

    return (
        <Container className='w-100 rootContainer'>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ELEMENTS, path: ROUTES.ELEMENTS}, {label: elementContent?.name}]}/>

            {loading ? (
                <Spinner animation="border" variant="dark" />
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