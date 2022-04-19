import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Card, Col, Button} from 'react-bootstrap'

const ProductCard = ({productProp}) =>{


	const {name, description, price, _id} = productProp;

	
	return (
	
			<Card  className ="ProductCard mt-5 shadow-lg "  style={{ width: '18rem' }}>
			<Card.Img variant="top" src="https://image.made-in-china.com/43f34j00jpifBTFPJGgq/The-Latest-RGB-Light-Strip-Computer-Case-Game-Computer-Case-PC-Case.jpg" />
				  <Card.Body>
				    <Card.Title>{name}</Card.Title>
				    <Card.Subtitle>Description:</Card.Subtitle>
				    <Card.Text>{description}</Card.Text>
				    <Card.Subtitle>Price:</Card.Subtitle>
				    <Card.Text>Php {price}</Card.Text>
				    <Button variant="primary" as={Link} to={`/products/${_id}`} >See Details</Button>
				  </Card.Body>
			</Card>
		
		)	

}

export default ProductCard;