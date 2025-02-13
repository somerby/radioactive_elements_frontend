import { FC, useEffect } from "react";
import { Button, Container, Row, Spinner, Table } from "react-bootstrap";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../../Routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getElementsWithSearch, useElements, useElementsLoading } from "../../slices/elementsSlice";
import './ElementsTable.css'
import { Link, useNavigate } from "react-router-dom";
import { deleteElement } from "../../slices/elementSlice";
import { useIsModerator } from "../../slices/userSlice";

const ElementsTablePage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const isModerator = useIsModerator()
    const elements = useElements()
    const loading = useElementsLoading()

    useEffect(() => {
        if (!isModerator) {
            navigate(ROUTES.FORBIDDEN)
        }
        dispatch(getElementsWithSearch(''))
    }, [])

    useEffect(() => {
        if (!isModerator) {
            navigate(ROUTES.FORBIDDEN)
        }
    }, [isModerator])

    const statusFormat = (status: string) => {
        const statusMap: Record<string, string> = {
            "active": "Активный",
            "deleted": "Удаленный",
        };
    
        return statusMap[status]
    };

    const handleDelete = async (elementId: string) => {
        await dispatch(deleteElement(elementId))
        await dispatch(getElementsWithSearch(''))
    }

    return (
        <Container className="w-100 rootContainer">
            {loading ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </Row>
            ) : (
                <>
                <BreadCrumbs crumbs={[{path: ROUTES.ELEMENTS, label: ROUTE_LABELS.ELEMENTS}, {label: ROUTE_LABELS.ELEMENTS_TABLE}]}/>
                <Link to={ROUTES.ADDEDITELEMENT}>
                    <Button variant="outline-dark" className="createElementButton">Создать</Button>
                </Link>
                <div className="w-100" style={{overflowX: 'auto'}}>
                    <Table className="tableStyle">
                        <thead>
                            <tr>
                                <th>ID Элемента</th>
                                <th>Название</th>
                                <th>Статус</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {elements.slice().sort((a, b) => a.element_id! - b.element_id!)
                                .map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.element_id}</td>
                                    <td>{item.name}</td>
                                    <td>{statusFormat(item.status)}</td>
                                    <td>
                                        <Link to={`${ROUTES.ADDEDITELEMENT}/${item.element_id}`}>
                                            <Button variant="warning">Редактировать</Button>
                                        </Link>
                                    </td>
                                    {item.status === 'active' ? (
                                        <td><Button variant="danger" onClick={() => handleDelete(item.element_id.toString())}>Удалить</Button></td>
                                    ): (
                                        <td></td>
                                    )}
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
export default ElementsTablePage