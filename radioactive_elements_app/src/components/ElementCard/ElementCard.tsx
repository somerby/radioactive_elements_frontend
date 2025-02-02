import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { ElementInf } from '../../modules/Api';
import defaultImg from '../../assets/default.jpg'
import './ElementCard.css'

export const ElementCard: FC<ElementInf> = ({ element_id, name, img_url, period_time_text }) => (
    <Card>
      <Card.Img variant="top" src={img_url || defaultImg} className='cardImg'/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text dangerouslySetInnerHTML={{ __html: period_time_text }} />
        <Link to={`${ROUTES.ELEMENTS}/${element_id}`}>
          <Button className='w-100' variant="dark">Подробнее</Button>
        </Link>
      </Card.Body>
    </Card>
)
export default ElementCard;