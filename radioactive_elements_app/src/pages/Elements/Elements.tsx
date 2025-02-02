import { FC, useState, useEffect } from 'react'
import { Row, Col, Spinner, Container } from 'react-bootstrap';
import { ElementInf, getElementsWithSearch } from '../../modules/Api';
import ElementCard from '../../components/ElementCard/ElementCard';
import "./Elements.css"
import { ROUTE_LABELS } from '../../Routes';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import InputField from '../../components/InputField/InputField';

const ElementsPage: FC = () => {
    const [atomicMass, setAtomicMass] = useState('')
    const [elements, setElements] = useState<ElementInf[]>([])
    const [loading, setLoading] = useState(false)

    const elementSearch = async () =>{
        setLoading(true)
        getElementsWithSearch(atomicMass).then((response) => {
                setElements(response.elements)
                setLoading(false)
            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        elementSearch()
    }, [])

    return (
        <Container className='w-100 rootContainer'>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ELEMENTS}]}/>
            <Row>
                <Col md={12}>
                    <div className='inputField'>
                        <InputField
                            value={atomicMass}
                            setValue={(value: string) => setAtomicMass(value)}
                            placeholder='Введите атомную массу'
                            buttonText='Найти'
                            onSubmit={elementSearch}
                        />
                    </div>
                </Col>
            </Row>

            {loading ? (
                <Row>
                    <Col lg = {3} md={6} xs={6}>
                        <Spinner animation="border" variant="dark" />
                    </Col>
                </Row>
            ): (
                <Row className="g-4">
                    {elements.filter(item => item.status === 'active').map((item, index)=> (
                        <Col lg = {3} md={4} xs={6} key={index}>
                            <ElementCard {...item}/>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export default ElementsPage