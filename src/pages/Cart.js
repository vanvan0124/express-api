import { useState, useEffect, useContext } from 'react';
import { Container, Table } from "react-bootstrap";
import {Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";



export default function Cart() {


	 const {user} = useContext(UserContext);
    const [carts, setCarts] = useState();


    useEffect(()=>{
    	fetch('http://localhost:4000/users/viewMyCart',{
    		headers: {
    			Authorization : `Bearer ${localStorage.getItem("token")}`

    		}

    	})
    	.then(res=>res.json())
    	.then(data=> {

    		setCarts(data.map(cart=>{

    			let orderDate= new Date(cart.dateAddedtoCart).toLocaleDateString();

    			return (
    				<tr key={cart._id}>
                        <td>{cart._id}</td>
                        <td>{cart.productId}</td>
                        <td>{orderDate}</td>

                    </tr>

    				)


    		}))

    	})







    },[])
    

	return(


 
            <Container className="text-center">
                <h1 className="mt-3">My Cart</h1>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Product Id</th>
                            <th>Purchased On</th>
                        </tr>
                    </thead>
                    <tbody>
                       {carts}
                    </tbody>
                </Table>
            </Container>
		)


}