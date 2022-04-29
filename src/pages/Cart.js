import { useState, useEffect, useContext } from 'react';
import { Container, Table, Button} from "react-bootstrap";
import {Navigate, Link, useParams, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

import Swal from 'sweetalert2'



export default function Cart() {


	 const {user} = useContext(UserContext);
    const [carts, setCarts] = useState();

    const history = useNavigate();


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

                Swal.fire({
                    title: "Success",
                    icon : "success",
                    text: "Order completed"
                })

                history("/products");


        })


    }





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
                        <Button variant ="primary" onClick={()=> order(productId)}>Checkout</Button> 

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