import { FC, useState, useEffect } from 'react'
import { Row, Col, Spinner, Container, Image } from 'react-bootstrap';
import { ElementInf, getElementsWithSearch } from '../../modules/Api';
import ElementCard from '../../components/ElementCard/ElementCard';
import "./Elements.css"
import { ROUTE_LABELS } from '../../Routes';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import InputField from '../../components/InputField/InputField';
import { useDispatch } from 'react-redux';
import { setAtomicMassAction, useAtomicMass } from '../../slices/dataSlice';
import mockElements from '../../modules/Mock';

const ElementsPage: FC = () => {
    const dispatch = useDispatch()
    const atomicMass = useAtomicMass()
    const [elements, setElements] = useState<ElementInf[]>([])
    const [loading, setLoading] = useState(false)

    const loadContent = async () =>{
        setLoading(true)
        getElementsWithSearch(atomicMass).then((response) => {
                setElements(response.elements)
                setLoading(false)
            }).catch(() => {
                setElements(mockElements.elements.filter((el) => el.atomic_mass.toString().includes(atomicMass.toString())))
                setLoading(false)
            })
        dispatch(setAtomicMassAction(atomicMass))
    }

    useEffect(() => {
        loadContent()
    }, [])

    return (
        <Container className='w-100 rootContainer'>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ELEMENTS}]}/>
            <Row>
                <Col md={12}>
                    <div className='inputField'>
                        <InputField
                            value={atomicMass}
                            setValue={(value: string) => dispatch(setAtomicMassAction(value))}
                            placeholder='Введите атомную массу'
                            buttonText='Найти'
                            onSubmit={loadContent}
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