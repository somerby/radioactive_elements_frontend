import { FC, useEffect, useState } from 'react'
import { Col, Container, Row, Image, Spinner} from "react-bootstrap";
import { ElementInf } from '../../modules/Api';
import { useParams } from 'react-router-dom';
import { getElementWithId } from '../../modules/Api';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../../Routes';
import defaultImg from '../../assets/default.jpg'
import './Element.css'

const ElementPage: FC = () => {
    const [elementContent, setElementContent] = useState<ElementInf>({element_id: 0, 
                                                                      name: '',
                                                                      description: '',
                                                                      status: '',
                                                                      img_url: '',
                                                                      period_time_text: '',
                                                                      period_time: 0,
                                                                      atomic_mass: 0});
    const [loading, setLoading] = useState(false)
    const {elementId} = useParams();

    const loadContent = async () => {
        if (!elementId) return;
        setLoading(true)
        getElementWithId(elementId).then((response) => {
                setElementContent(response)
                setLoading(false)
            }).finally(() => {
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
                <Row>
                    <Col md={4} xs={4}>
                        <Image src={elementContent?.img_url || defaultImg} fluid/>
                    </Col>
                    <Col md={8}>
                        <h1>{elementContent?.name}</h1>
                        <p dangerouslySetInnerHTML={{__html: elementContent?.description}}/>
                    </Col>
                </Row>
            )}
        </Container>
    )
}
export default ElementPage;