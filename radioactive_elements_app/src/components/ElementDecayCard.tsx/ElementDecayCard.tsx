import { FC } from 'react'
import { Button, Card, InputGroup, Form } from 'react-bootstrap'
import defaultImg from '/default.jpg'
import './ElementDecayCard.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { deleteElementFromDecay, setDecayElementQuantityAction, useDecayElements, useDecayStatus } from '../../slices/decaySlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Routes';

interface element {
    element_id?: number;
    name: string;
    status?: string;
    img_url?: string | null;
  }

interface decayElement {
    id?: number;
    element?: element;
    quantity?: string | null;
    remaining_quantity?: string | null;
    decay?: number;
}

export const ElementDecayCard: FC<decayElement> = (decayElement) => {
    const dispatch = useDispatch<AppDispatch>()
    const status = useDecayStatus()

    const handleDelete = async () => {
        await dispatch(deleteElementFromDecay({elementId: decayElement.element?.element_id!, decayId: decayElement.decay!}))
    }

    return (
        <Card border='dark'>
            <Card.Body className='d-flex flex-column flex-md-row'>
                <Card.Img variant="top" src={decayElement.element!.img_url || defaultImg} className='elementDecayImg pe-md-3 mx-auto mx-md-0'/>
                <div className='d-flex flex-column w-100 justify-content-between'>
                    <Card.Title className='decayCardTitle pt-2 pt-md-0 mx-auto mx-md-0'>{decayElement.element?.name}</Card.Title>
                    <InputGroup>
                        <div className='d-flex flex-column flex-md-row w-100 align-items-start'>
                            <Form.Label className="decayText formLabel mx-auto mx-md-0 my-0 my-md-auto">Количество:</Form.Label>
                            <Form.Control className="decayText border-dark"
                                        value={decayElement.quantity!}
                                        onChange={(e) => dispatch(setDecayElementQuantityAction({ element_id: decayElement.element?.element_id, quantity: e.target.value}))}
                                        required
                                        placeholder="Введите количество"
                                        {...status !== "draft" ? {readOnly: true} : {}}/>
                        </div>
                    </InputGroup>
                    {status === "draft" ? (
                        <Button className='customButton mt-3 mt-md-0' variant='outline-danger' onClick={handleDelete}>Удалить</Button>
                    ) : (
                        <Form.Label className='decayText formLabel mt-3 mt-md-0'>Оставшееся количество вещества: {decayElement.remaining_quantity}</Form.Label>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}
export default ElementDecayCard;