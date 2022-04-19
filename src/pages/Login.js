import {useState, useEffect, useContext} from 'react';
import {Navigate} from 'react-router-dom';	
import {Form, Button, Card, Container, Col, Row} from 'react-bootstrap'
import Swal from 'sweetalert2';
import UserContext from '../UserContext'



const Login = (props) =>{

	const {user, setUser} = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);

	function logInUser(e){	
		e.preventDefault()

		fetch('http://localhost:4000/users/login', {
			method : "POST",
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify({
				email : email,
				password : password
			})

		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(typeof data.accessToken !== "undefined"){

				localStorage.setItem('token', data.accessToken)
				retrieveUserDetails(data.accessToken)

				Swal.fire({
					title : 'Login Successful',
					icon: 'success',
					text: 'Enjoy Shopping'

				})


			} else {

				Swal.fire({
					title :'Login Failed',
					icon: 'error',
					text: 'Please check your email and password'

				})

			}

		})

		setEmail('')
		setPassword('')

		const retrieveUserDetails = (token) => {
			fetch('http://localhost:4000/users/profile',{

				headers : {
					Authorization : `Bearer ${token}`
				}
			})
			.then(res => res.json())
			.then(data => {
				console.log(data)

				setUser({
					id: data._id,
					isAdmin: data.isAdmin
				})
			})

		}
		

	}

	useEffect(() => {

		if(email !== '' && password !== ''){

			setIsActive(true)
		} else {
			setIsActive(false)
		}


	}, [email, password])




	return(
		(user.id !== null) ?

		<Navigate to = "/products"/>

		:	

		<Container>
			<Col className="justify-content-center">
			
			<Card className="text-center center-block my-5 shadow-lg"  >
			<Card.Title className=" bg-dark p-3"><h3 className ="text-white">LOGIN</h3></Card.Title>
			<Card.Body>

			<Form onSubmit={e => logInUser(e)}>
			  <Form.Group controlId="userEmail">
			    <Form.Label>Email address</Form.Label>
			    <Form.Control
			    type = "email"
				placeholder = "Enter email here"
				value ={email}
				onChange ={e => setEmail(e.target.value)}
				required


			    />
			  </Form.Group>

			  <Form.Group controlId="password1">
			    <Form.Label>Password</Form.Label>
			    <Form.Control
			    type="password"
				placeholder ="Enter your password"
				autoComplete="on"
				value = {password}
				onChange = {e => setPassword(e.target.value)}
				required

			    />
			  </Form.Group>


			  { 
			  	isActive
			  	?

			  	<Button variant ="primary" type ="submit" id="submitBtn" className ="my-3">
								Login
				</Button>
				:
				<Button variant ="danger" type ="submit" id="submitBtn" className ="my-3" disabled>
								Login
				</Button>

			 }
			 


			</Form>
			</Card.Body>
			
			</Card>
			
			</Col>
			</Container>

		)

}
export default Login;