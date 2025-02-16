import React, { FC, FormEvent, useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Image, Row, Spinner, Table } from "react-bootstrap";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../../Routes";
import { useNavigate, useParams } from "react-router-dom";
import { editElement, getElementWithId, saveElementImage, setElementAtomicMassAction, setElementDescriptionAction, setElementInitialStateAction, setElementNameAction, setElementPeriodTimeAction, setElementPeriodTimeTextAction, setElementStatusAction, useElement, useElementLoading, createElement, setElementAttributeValueAction, editElementAttribute, deleteElementAttribute, useElementAttributeName, useElementAttributeValue, setElementAttributeAddNameAction, addElementAttribute, setElementAttributeAddValueAction } from "../../slices/elementSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import defaultImg from '/default.jpg'
import './AddEditElement.css'
import { useIsModerator } from "../../slices/userSlice";

const AddEditElementPage: FC = () => {
    const {elementId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const loading = useElementLoading()
    const element = useElement()
    const attributeName = useElementAttributeName()
    const attributeValue = useElementAttributeValue()
    const isModerator = useIsModerator()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [previewImageUrl, setPreviewImageUrl] = useState<string>('')

    useEffect(() => {
        if (!isModerator) {
            navigate(ROUTES.FORBIDDEN)
        }
        if (elementId) {
            dispatch(getElementWithId(elementId))
        } else {
            dispatch(setElementInitialStateAction())
        }
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

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (elementId) {
            dispatch(editElement(elementId))
            if (selectedImage) {
                dispatch(saveElementImage({elementId: elementId, file: selectedImage}))
            }
        } else {
            dispatch(createElement())
        }
        navigate(ROUTES.ELEMENTS_TABLE)
    }

    const handleUpload = (e: React.ChangeEvent<any>) => {
        const file = e.target.files[0]
        setSelectedImage(file)
        setPreviewImageUrl(URL.createObjectURL(file))
    }

    const handleAttributeUpdate = (attributeId: number) => {
        dispatch(editElementAttribute({elementId: element.element_id!, attributeId}))
    }

    const handleAttributeDelete = (attributeId: number) => {
        dispatch(deleteElementAttribute({elementId: element.element_id!, attributeId: attributeId}))
    }

    const handleAttributeAdd = (event: FormEvent) => {
        event.preventDefault()
        if (!attributeName) {
            alert('Введите название атрибута')
            return
        }
        dispatch(addElementAttribute(element.element_id?.toString()!))
    }

    return (
        <Container className="w-100 rootContainer">
            {elementId ? (
                <BreadCrumbs crumbs={[{path: ROUTES.ELEMENTS, label: ROUTE_LABELS.ELEMENTS}, 
                                      {path: ROUTES.ELEMENTS_TABLE, label: ROUTE_LABELS.ELEMENTS_TABLE}, 
                                      {label: 'Редактирование элемента'}]}/>
            ) : (
                <BreadCrumbs crumbs={[{path: ROUTES.ELEMENTS_TABLE, label: ROUTE_LABELS.ELEMENTS_TABLE}, {label: 'Создание элемента'}]}/>
            )}
            {loading ? (
                <div  className='d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="dark" />
                </div>
            ) : (
            <Row className="w-100">
                <Col lg={6} md={8} xs={12} className="mx-auto">
                    <Form onSubmit={handleSubmit} className="w-100">
                        {elementId &&
                        <>
                            <div className="w-100 d-flex justify-content-center">
                                <Image src={previewImageUrl || element.img_url || defaultImg} className="editImg"/>
                            </div>
                            <Form.Label className="editFormLabel mt-3">Загрузите иконку:</Form.Label>
                            <Form.Control type="file"
                                        accept="image/*"
                                        onChange={handleUpload}
                                        className="editFileInput border-dark"/>
                        </>}
                        <Form.Label className="editFormLabel mt-3">Название:</Form.Label>
                        <Form.Control value={element.name}
                                      onChange={(e) => dispatch(setElementNameAction(e.target.value))}
                                      className="w-100 editFormInput border-dark"
                                      required/>
                        <Form.Label className="editFormLabel mt-3">Атомная масса:</Form.Label>
                        <Form.Control value={element.atomic_mass}
                                      onChange={(e) => dispatch(setElementAtomicMassAction(e.target.value))}
                                      className="w-100 editFormInput border-dark"
                                      required/>
                        <Form.Label className="editFormLabel mt-3">Описание:</Form.Label>
                        <Form.Control value={element.description}
                                      onChange={(e) => dispatch(setElementDescriptionAction(e.target.value))}
                                      className="w-100 editDescription editFormInput border-dark"
                                      as={'textarea'}
                                      required/>
                        <Form.Label className="editFormLabel mt-3">Статус:</Form.Label>
                        <Dropdown onSelect={(eventKey) => dispatch(setElementStatusAction(eventKey))}>
                            <Dropdown.Toggle variant="outline-dark" className="editStatus">
                                {statusFormat(element.status)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="active" className="editStatus">Активный</Dropdown.Item>
                                <Dropdown.Item eventKey="deleted" className="editStatus">Удаленный</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Label className="editFormLabel mt-3">Период полураспада (то, что видно на экране):</Form.Label>
                        <Form.Control value={element.period_time_text}
                                      onChange={(e) => dispatch(setElementPeriodTimeTextAction(e.target.value))}
                                      className="w-100 editFormInput border-dark"
                                      required/>
                        <Form.Label className="editFormLabel mt-3">Период полураспада в секундах:</Form.Label>
                        <Form.Control value={element.period_time}
                                      onChange={(e) => dispatch(setElementPeriodTimeAction(e.target.value))}
                                      className="w-100 editFormInput border-dark"
                                      required/>
                        {elementId ? ( <>
                        {element.attributes?.length !== 0 && (
                        <>
                            <Form.Label className="editFormLabel mt-3">Атрибуты:</Form.Label>
                            <Table className="border-dark elementAddEditAttributes">
                                <tbody>
                                    {element.attributes?.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.attribute?.name}</td>
                                                <td><Form.Control value={item.value!}
                                                                onChange={(e) => dispatch(setElementAttributeValueAction({attribute_id: item.attribute?.attribute_id, 
                                                                                                                            value: e.target.value}))}
                                                                className="border-dark w-100"/>
                                                </td>
                                                <td><Button variant="success" 
                                                            className="elementAddEditAttributesButton" 
                                                            onClick={() => handleAttributeUpdate(item.attribute?.attribute_id!)}>
                                                        Сохранить
                                                    </Button>
                                                </td>
                                                <td><Button variant="danger" 
                                                            className="elementAddEditAttributesButton" 
                                                            onClick={() => handleAttributeDelete(item.attribute?.attribute_id!)}>
                                                        Удалить
                                                    </Button>
                                                    </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </>
                        )}
                        <Form.Label className={element.attributes?.length === 0 ? "editFormLabel mt-3" : "editFormLabel"}>Добавление атрибута:</Form.Label>
                        <div className="d-flex flex-row">
                            <Form.Control value={attributeName!}
                                        onChange={(e) => dispatch(setElementAttributeAddNameAction(e.target.value))}
                                        placeholder="Название"
                                        className="elementAttributeNameValue border-dark"/>
                            <Form.Control value={attributeValue!}
                                        onChange={(e) => dispatch(setElementAttributeAddValueAction(e.target.value))}
                                        placeholder="Значение"
                                        className="elementAttributeNameValue border-dark"/>
                            <Button variant="outline-dark" type="button" onClick={handleAttributeAdd}>Добавить</Button>
                        </div>
                        </>) : (<></>)}
                        <div className="w-100 d-flex align-items-center mt-3">
                            <Button variant="success" type="submit" className="mx-auto editSubmitButton">Сохранить</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            )} 
        </Container>
    )
}
export default AddEditElementPage