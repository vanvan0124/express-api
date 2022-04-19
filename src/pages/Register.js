import {useState, useEffect, useContext} from 'react';
import {Form, Button, Card, Container, Col, Row} from 'react-bootstrap'
import UserContext from '../UserContext'
import {Navigate, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'




const Register = () => {

	const { user } = useContext(UserContext);

	const history = useNavigate();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] =useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);



function registerUser(e){	

	e.preventDefault();

	fetch('http://localhost:4000/users/checkEmail',{
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({
			email:email
		 })

		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data === true){
				Swal.fire({
					title: "Email Already Exist",
					icon: "error",
					text : "Please provide another email"
				})
			} else {
				fetch('http://localhost:4000/users/register', {
					method: 'POST',
					headers: {
						'Content-Type' :'application/json'

					},
					body : JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						mobileNo : mobileNo,
						email: email,
						password: password
					})
				})
				.then(res=> res.json())
				.then(data => {
					console.log(data)
					if(data === true ){
						setFirstName('');
						setLastName('');
						setMobileNo('');
						setEmail('');
						setPassword('')

						Swal.fire({
							title : 'Success',
							icon: 'success',
							text: 'Welcome to Zuitt'
						})
						history("/login")

					} else {
						Swal.fire({
							title: 'Something went wrong',
							icon: 'error',
							text: 'Please try again'
						})
					}
				})
			}

		})





	setFirstName('');
	setLastName('');
	setMobileNo('');
	setEmail('');
	setPassword('')
	
	alert('Thank you for registering!');
}




useEffect(() => {

	if(firstName !=='' && lastName !==''  && mobileNo !=='' && email !== '' && password !=='' ){

		setIsActive(true);

	}	else {
		setIsActive(false);
	}


}, [firstName, lastName, mobileNo, email, password])


	return(	

			<Container>
			<Col className="justify-content-center">
			
			<Card className="text-center center-block my-5 shadow-lg"  >
			<Card.Title className=" bg-dark p-3"><h3 className ="text-white">REGISTER</h3></Card.Title>
			<Card.Body>
			<Form>
			<Form.Group controlId="firstName">
			    <Form.Label>First Name</Form.Label>
			    <Form.Control type="text" placeholder="Enter your first name" />
			  </Form.Group>

			  <Form.Group controlId="lastName">
			    <Form.Label>Last Name</Form.Label>
			    <Form.Control type="text" placeholder="Enter email" />
			  </Form.Group>

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
export default Register;