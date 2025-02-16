import { FC, useEffect } from 'react'
import { Col, Container, Row, Image, Spinner, Table} from "react-bootstrap";
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
                        <Col md={2} xs={4}>
                            <Image src={elementContent?.img_url || defaultImg} fluid/>
                        </Col>
                        <Col md={10} xs={8}>
                            <h1 className='elementName'>{elementContent?.name}</h1>
                            <p className='elementPeriodTime' dangerouslySetInnerHTML={{__html: elementContent?.period_time_text}}/>
                        </Col>
                    </Row>
                    <Row>
                        <p className='elementDescription' dangerouslySetInnerHTML={{__html: elementContent?.description}}/>
                    </Row>
                    <Row>
                        <Col lg={{span: 6, offset: 3}} md={{span:8, offset: 2}} xs={12}>
                        <p className='elementAttributesLabel'>Атрибуты:</p>
                            <Table bordered className='border-dark elementAttributes'>
                                <tbody>
                                    {elementContent.attributes?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.attribute?.name}</td>
                                                <td dangerouslySetInnerHTML={{__html: item.value || ''}} />
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}
export default ElementPage;