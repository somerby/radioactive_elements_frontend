import { FC, useEffect } from "react"
import { Button, Container, Form, Row, Spinner, Table, Dropdown } from "react-bootstrap"
import { getDecays, resetFiltersAction, setFilterEndDateAction, setFilterStartDateAction, setFilterStatusAction, useDecays, useDecaysLoading, useEndDate, useStartDate, useStatus } from "../../slices/decaysSlice"
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs"
import { ROUTES, ROUTE_LABELS } from "../../Routes"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { Link } from "react-router-dom"
import "./Decays.css"

const DecaysPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const decays = useDecays()
    const startDate = useStartDate()
    const endDate = useEndDate()
    const status = useStatus()
    const loading = useDecaysLoading()

    useEffect(() => {
        dispatch(getDecays({}))
    }, [])

    const handleSelect = (eventKey: string | null) => {
        dispatch(setFilterStatusAction(eventKey))
    }

    const handleReset = () => {
        dispatch(resetFiltersAction())
        dispatch(getDecays({}))
    }

    const statusFormat = (status: string) => {
        const statusMap: Record<string, string> = {
            "Завершен": "completed",
            "Отклонен": "rejected",
            "Сформирован": "formed"
        };
    
        return statusMap[status]
    };

    const handleApply = () => {
        console.log(startDate, endDate, status)
        dispatch(getDecays({status: statusFormat(status), start_date: startDate, end_date: endDate}))
    }

    return (
        <Container className="rootContainer w-100">
            {loading ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </Row>
            ) : (
                <>
                <BreadCrumbs crumbs={[{label: ROUTE_LABELS.DECAYS}]}/>
                <div className="d-flex justify-content-center filtersText mb-4">
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
                    <Button variant="outline-success" className="filtersButton" onClick={handleApply}>Применить</Button>
                    <Button variant="outline-danger" className="filtersButton" onClick={handleReset}>Сбросить</Button>
                </div>
                <Table className="tableStyle">
                    <thead>
                        <tr>
                            <th>ID Распада</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            <th>Статус</th>
                            <th>Открыть</th>
                        </tr>
                    </thead>
                    <tbody>
                    {decays.map((_, i) => {
                        const item = decays[decays.length - 1 - i]
                        return (
                            <tr key={i}>
                                <td>{item.decay_id}</td>
                                <td>{item.date_of_creation}</td>
                                <td>{item.date_of_formation}</td>
                                <td>{item.date_of_finish}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Link to={`${ROUTES.DECAYS}/${item.decay_id}`}>
                                        <Button variant="dark" className="">Открыть</Button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                </>
            )}
        </Container>
    )
}
export default DecaysPage