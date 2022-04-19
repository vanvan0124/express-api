import {useState, useEffect, useContext} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {useParams, useNavigate, Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function ProductView() {

	const {user} =useContext(UserContext);
	const history = useNavigate();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0)

	const {productId} = useParams();

	const order = (productId) => {
		fetch('http://localhost:4000/users/order', {
			method : "POST",
			headers : {
				"Content-Type" : "application/json",
				Authorization : `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				productId : productId

			})



		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data=== true){

				Swal.fire({
					title: "Enrolled Successfully",
					icon : "success",
					text: "You are now enrolled"
				})

				history("/products");

			} else {

				Swal.fire({
					title: "Error",
					icon : "error",
					text: "Not allowed"

				})
			}

		})


	}


	useEffect(()=>{
		console.log(productId)

		fetch(`http://localhost:4000/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price)
		})

	}, [productId])


	return(
		<Container className="mt-5 mb-5">
			<Row>
				<Col lg={{span:6, offset:3}}>
					<Card className="shadow-lg">
					<Card.Img variant="top" src="https://image.made-in-china.com/43f34j00jpifBTFPJGgq/The-Latest-RGB-Light-Strip-Computer-Case-Game-Computer-Case-PC-Case.jpg" />
						<Card.Body>
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description</Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price</Card.Subtitle>
							<Card.Text>Php {price}</Card.Text>
						

							{ user.id !== null
								?
								<Button variant ="primary" onClick={()=> order(productId)}>Buy</Button>

								:

								<Link className="btn btn-danger" to="/login">Log In to Buy</Link>
							}

						</Card.Body>
					</Card>
				</Col>											
			</Row>


		</Container>


		)


}