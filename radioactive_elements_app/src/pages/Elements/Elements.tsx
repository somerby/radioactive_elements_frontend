import { FC, useEffect } from 'react'
import { Row, Col, Spinner, Container } from 'react-bootstrap';
import ElementCard from '../../components/ElementCard/ElementCard';
import "./Elements.css"
import { ROUTE_LABELS, ROUTES } from '../../Routes';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import InputField from '../../components/InputField/InputField';
import { useDispatch } from 'react-redux';
import { setAtomicMassAction, useAtomicMass, useElements, useElementsLoading } from '../../slices/elementsSlice';
import { getElementsWithSearch } from '../../slices/elementsSlice';
import { AppDispatch } from '../../store';
import { useDecayInf, useIsAuthenticated } from '../../slices/userSlice';
import decayLogo from '/quote.jpg'
import { Link } from 'react-router-dom';

const ElementsPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const atomicMass = useAtomicMass()
    const elements = useElements()
    const loading = useElementsLoading()
    const isAuthenticated = useIsAuthenticated()
    const decayInf = useDecayInf()

    const handleSearch = () => {
        dispatch(getElementsWithSearch())
    }

    useEffect(() => {
        handleSearch()
    }, [])

    useEffect(() => {
        handleSearch()
    }, [isAuthenticated])

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
                            onSubmit={handleSearch}
                        />
                    </div>
                </Col>
            </Row>

            {loading ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
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

            {decayInf.decay_id && decayInf.decay_elements_count && isAuthenticated ? (
                <>
                    <Link to={`${ROUTES.DECAYS}/${decayInf.decay_id}`}>
                        <img src={decayLogo} className='draftDecayLogo'/>
                        <span className='draftDecayLogoCount d-flex justify-content-center align-items-center'>{decayInf.decay_elements_count}</span>
                    </Link>
                </>
            ) : (
                <img src={decayLogo} className='draftDecayLogo blackNWhiteLogo'/>
            )}
            
        </Container>
    )
}

export default ElementsPage