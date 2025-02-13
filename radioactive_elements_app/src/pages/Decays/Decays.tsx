import { FC, useEffect, useState } from "react"
import { Button, Container, Form, Row, Spinner, Table, Dropdown } from "react-bootstrap"
import { getDecays, resetFiltersAction, setFilterEndDateAction, setFilterStartDateAction, setFilterStatusAction, useDecays, useDecaysLoading, useEndDate, useStartDate, useStatus, useDecaysEmail, setDecaysEmailAction } from "../../slices/decaysSlice"
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs"
import { ROUTES, ROUTE_LABELS } from "../../Routes"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { Link, useNavigate } from "react-router-dom"
import "./Decays.css"
import { useIsAuthenticated, useIsModerator } from "../../slices/userSlice"
import { moderateDecay, rejectDecay } from "../../slices/decaysSlice"
import time from '/time.svg'
import reject from '/reject.svg'
import href from '/href.svg'

const DecaysPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isAuthenticated = useIsAuthenticated()
    const decays = useDecays()
    const startDate = useStartDate()
    const endDate = useEndDate()
    const status = useStatus()
    const email = useDecaysEmail()
    const isModerator = useIsModerator()
    const navigate = useNavigate()
    const [firstLoading, setFirstLoading] = useState(true)

    useEffect(() => {
        fetchDecays().then(() => {setFirstLoading(false)})
    }, [])

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(ROUTES.FORBIDDEN)
        }
    }, [isAuthenticated])

    useEffect(() => {
        fetchDecays()
        const id = setInterval(fetchDecays, 1000)
        return () => clearInterval(id)
    }, [status, startDate, endDate])

    const fetchDecays = async () => {
        await dispatch(getDecays({status: statusFormat(status), start_date: startDate, end_date: endDate}))
    }

    const handleSelect = (eventKey: string | null) => {
        dispatch(setFilterStatusAction(eventKey))
    }

    const handleReset = () => {
        dispatch(resetFiltersAction())
    }

    const statusFormat = (status: string) => {
        const statusMap: Record<string, string> = {
            "Завершен": "completed",
            "Отклонен": "rejected",
            "Сформирован": "formed"
        };
    
        return statusMap[status]
    };

    const handleFinish = (decayId: number) => {
        dispatch(moderateDecay(decayId))
    }

    const handleReject = (decayId: number) => {
        dispatch(rejectDecay(decayId))
    }

    const handleOpen = (decayId: number) => {
        navigate(`${ROUTES.DECAYS}/${decayId}`)
    }

    return (
        <Container className="rootContainer w-100">
            {firstLoading ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </Row>
            ) : (
                <>
                <BreadCrumbs crumbs={[{label: ROUTE_LABELS.DECAYS}]}/>
                <div className={isModerator ? "d-flex flex-column flex-md-row justify-content-center filtersText" 
                                            : "d-flex flex-column flex-md-row justify-content-center filtersText pb-3"}>
                    <div className="d-flex flex-row justify-content-center">
                        <Form.Label className="my-auto">с</Form.Label>
                        <Form.Control type="date" 
                                    className="filtersDate border-dark"
                                    value={startDate}
                                    onChange={(e) => dispatch(setFilterStartDateAction(e.target.value))}/>
                        <Form.Label className="my-auto">по</Form.Label>
                        <Form.Control type="date" 
                                    className="filtersDate border-dark"
                                    value={endDate}
                                    onChange={(e) => dispatch(setFilterEndDateAction(e.target.value))}/>
                    </div>
                    <div className="d-flex flex-row justify-content-center mt-2 mt-md-0">
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle variant="outline-dark" className="filtersToggleButton">
                                {status || 'Статус'}
                            </Dropdown.Toggle>
                            
                            <Dropdown.Menu>
                            <Dropdown.Item eventKey='' active={!status}>Статус</Dropdown.Item>
                            <Dropdown.Divider />
                                <Dropdown.Item eventKey="Завершен">Завершен</Dropdown.Item>
                                <Dropdown.Item eventKey="Сформирован">Сформирован</Dropdown.Item>
                                <Dropdown.Item eventKey="Отклонен">Отклонен</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="outline-danger" className="filtersButton" onClick={handleReset}>Сбросить</Button>
                    </div>
                </div>
                {isModerator && (
                    <div className="d-flex justify-content-center pb-3 mt-2">
                        <Form.Label className="filtersText my-auto filtersEmailLabel">Создатель:</Form.Label>
                        <Form.Control className="filtersEmail border-dark"
                                        value={email}
                                        onChange={(e) => dispatch(setDecaysEmailAction(e.target.value))}/>
                    </div>
                )}
                <div className="w-100" style={{overflowX: 'auto'}}>
                <Table className="tableStyle">
                    <thead>
                        <tr>
                            <th>ID Распада</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            {isModerator && (
                                <>
                                <th>Создатель</th>
                                <th>Модератор</th>
                                </>
                            )}
                            <th>Статус</th>
                            <th>QR</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {decays.filter((el) => el.creator?.toLowerCase().includes(email.toLowerCase()))
                           .sort((a, b) => b.decay_id! - a.decay_id!)
                           .map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.decay_id}</td>
                                <td>{item.date_of_creation}</td>
                                <td>{item.date_of_formation}</td>
                                <td>{item.date_of_finish}</td>
                                {isModerator && (
                                    <>
                                    <td>{item.creator}</td>
                                    <td>{item.moderator}</td>
                                    </>
                                )}
                                <td>{item.status}</td>
                                <td>
                                    {item.status === 'Завершен' && (
                                        <>
                                            <div className={index >= decays.length - 3 ? "qr-hover-wrapper isBottom" : "qr-hover-wrapper isTop"}>
                                                <img src={href} className="decaysIcon status-icon" style={{cursor: 'pointer'}}/>
                                                <div className={index >= decays.length - 3 ? "qr-hover isBottom" : "qr-hover isTop"}>
                                                    {item.qr && <img className="qr-code" src={`data:image/png;base64,${item.qr}`} />}
                                                </div>
                                            </div>
                                        </>
                                        )}
                                    {item.status === 'Отклонен' && <img src={reject} className="decaysIcon"/>}
                                    {item.status === 'Сформирован' && <img src={time} className="decaysIcon"/>}
                                </td>
                                <td>
                                    {isModerator && item.status === 'Сформирован' ? (
                                        <Dropdown>
                                            <Dropdown.Toggle variant="dark">Действие</Dropdown.Toggle>
                                            <Dropdown.Menu id="dropdownMenu">
                                                <Dropdown.Item id="openAction" onClick={() => handleOpen(item.decay_id!)}>Открыть</Dropdown.Item>
                                                <Dropdown.Item id="finishAction" onClick={() => handleFinish(item.decay_id!)}>Завершить</Dropdown.Item>
                                                <Dropdown.Item id="rejectAction" onClick={() => handleReject(item.decay_id!)}>Отклонить</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    ) : (
                                        <Link to={`${ROUTES.DECAYS}/${item.decay_id}`}>
                                            <Button variant="dark" className="">Открыть</Button>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                </div>
                </>
            )}
        </Container>
    )
}
export default DecaysPage