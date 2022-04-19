import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {Nav, Container, Navbar} from 'react-bootstrap'
import UserContext from '../UserContext';

export default function AppNavBar(){
	const {user} = useContext(UserContext);

	return (
		
	<Navbar collapseOnSelect expand="lg"  variant="dark" className ="color-nav px-5 pt-4">
			  <Navbar.Brand as={Link} to="/">V-STORE</Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
			  <Navbar.Collapse id="responsive-navbar-nav">
			    <Nav className="ml-auto">
			      <Nav.Link as={Link} to="/">Home</Nav.Link>
			      <Nav.Link as={Link} to="/products">Products</Nav.Link>


			      
			       { (user.id !== null) ?

			        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
			        :
			        <>
			        <Nav.Link as={Link} to="/register">Register</Nav.Link>
			        <Nav.Link as={Link} to="/login">Login</Nav.Link>
			        </>
			    	}
			      
			    
			    </Nav>
			   
			  </Navbar.Collapse>
</Navbar>


		)

}