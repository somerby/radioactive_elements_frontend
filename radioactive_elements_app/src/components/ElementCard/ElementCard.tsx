import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import defaultImg from '/default.jpg'
import './ElementCard.css'
import { useIsAuthenticated } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addElementToDecay } from '../../slices/elementsSlice';

interface elementProps {
  element_id: number,
  name: string,
  description: string,
  status: string,
  img_url: string,
  period_time_text: string,
  period_time: number,
  atomic_mass: number
}

export const ElementCard: FC<elementProps> = ({ element_id, name, img_url, period_time_text }) => {
  const dispatch = useDispatch<AppDispatch>()
  const isAuthenticated = useIsAuthenticated()

  const handleAdd = () => {
    dispatch(addElementToDecay(element_id.toString()))
  }

  return (
    <Card border='dark'>
      <Card.Img variant="top" src={img_url || defaultImg} className='cardImg'/>
      <Card.Body>
        <Card.Title className='cardTitle'>{name}</Card.Title>
        <Card.Text className='cardText' dangerouslySetInnerHTML={{ __html: period_time_text }} />
        {isAuthenticated && (<Button className='w-100 customButton' variant="dark" onClick={handleAdd}>Добавить</Button>)}
        <Link to={`${ROUTES.ELEMENTS}/${element_id}`}>
          <Button className='w-100 customButton' variant="dark" style={{ ...(isAuthenticated && {marginTop: "5px"})}}>Подробнее</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
export default ElementCard;