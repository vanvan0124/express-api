import {Form, Button, Card, Container, Col, Row} from 'react-bootstrap'


const Login = () =>{

	return(

		<Container>
			<Col className="justify-content-center">
			
			<Card className="text-center center-block my-5 shadow-lg"  >
			<Card.Title className=" bg-dark p-3"><h3 className ="text-white">Login</h3></Card.Title>
			<Card.Body>
			<Form>
			  <Form.Group controlId="formBasicEmail">
			    <Form.Label>Email address</Form.Label>
			    <Form.Control type="email" placeholder="Enter email" />
			  </Form.Group>

			  <Form.Group controlId="formBasicPassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control type="password" placeholder="Password" />
			  </Form.Group>



			  <Button variant="primary" type="submit">
			    Submit
			  </Button>
			</Form>
			</Card.Body>
			
			</Card>
			
			</Col>
			</Container>

		)

}
export default Login;