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
	
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);



 function registerUser(e){	

	e.preventDefault();

		fetch('https://pure-hamlet-97702.herokuapp.com/users/checkEmail',{
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
					setEmail('');
					setPassword('')


				Swal.fire({
					title: "Email Already Exist",
					icon: "error",
					text : "Please provide another email"
				})
			} else {
				fetch('https://pure-hamlet-97702.herokuapp.com/users/register', {
					method: 'POST',
					headers: {
						'Content-Type' :'application/json'

					},
					body : JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						phone:phone,
						password: password
					})
				})
				.then(res=> res.json())
				.then(data => {
					console.log(data)
				
						setFirstName('');
						setLastName('');
						setPhone('');
						setEmail('');
						setPassword('')

						Swal.fire({
							title : 'Success',
							icon: 'success',
							text: 'You can now log in '
						})
						history("/login")

					
				})
			}

		})





	
	
}


useEffect(() => {

	if(firstName !=='' && lastName !==''  && phone !=='' && email !== '' && password !=='' ){

		setIsActive(true);

	}	else {
		setIsActive(false);
	}


}, [firstName, lastName, phone, email, password])


	return(	
		(user.id !== null)
		?
		<Navigate to = "/products"/>

		:

			<Container>
			<Col className="justify-content-center">
			
			<Card className="text-center center-block my-5 shadow-lg"  >
			<Card.Title className=" bg-dark p-3"><h3 className ="text-white">REGISTER</h3></Card.Title>
			<Card.Body>
			<Form onSubmit={e => registerUser(e)}>
			<Form.Group controlId="firstName">
			    <Form.Label>First Name</Form.Label>
			    <Form.Control 
			    	type="text"
					placeholder = "Input your firstname here"
					value = {firstName}
					onChange ={e => setFirstName(e.target.value)}
					required/>
			  </Form.Group>

			  <Form.Group controlId="lastName">
			    <Form.Label>Last Name</Form.Label>
			    <Form.Control
			    	type="text"
					placeholder = "Input your last name here"
					value = {lastName}
					onChange ={e => setLastName(e.target.value)}
					required
			    />
			  </Form.Group>

			   <Form.Group controlId="userphone">
			    <Form.Label>Phone</Form.Label>
			    <Form.Control 
			   		type = "text"
					placeholder = "Enter your phone here"
					value={phone}
					onChange={e => setPhone(e.target.value)}
					required

			    />
			  </Form.Group>

			  <Form.Group controlId="Email">
			    <Form.Label>Email address</Form.Label>
			    <Form.Control 
			    	type = "email"
					placeholder = "Enter your email here"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
			    />
			  </Form.Group>

			 


			  <Form.Group controlId="userpassword">
			    <Form.Label>Password</Form.Label>
			    <Form.Control 
			    	type="password"
					placeholder = "Input your password here"
					autoComplete="on"
					value = {password}
					onChange ={e => setPassword(e.target.value)}
					required
			    />
			  </Form.Group>



			  { isActive ?

					<Button variant ="primary" type ="submit" id="submitBtn" className ="my-3">
					Submit
					</Button>
				:
					<Button variant ="danger" type ="submit" id="submitBtn" className ="my-3" disabled>
					Submit
					</Button>
				}
			</Form>
			</Card.Body>
			
			</Card>
			
			</Col>
			</Container>

			
		)

}
export default Register;