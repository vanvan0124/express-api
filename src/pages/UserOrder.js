
import { useState, useEffect, useContext } from 'react';
import { Container, Table } from "react-bootstrap";
import {Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";

const MyOrders = () => {

     const {user} = useContext(UserContext);
    const [orders, setOrders] = useState();
    
    useEffect(()=>{
        fetch('https://pure-hamlet-97702.herokuapp.com/retrieveOrders',{
            headers: {
                Authorization :`Bearer ${localStorage.getItem("token")}`
            }

        })
        .then(res=> res.json())
        .then(data => {

            setOrders(data.map(purchased=>{
                let orderDate = new Date(purchased.datePurchased).toLocaleDateString();


                return (
                    <tr key={purchased._id}>
                        <td>{purchased._id}</td>
                        <td>{purchased.productId}</td>
                        <td>{orderDate}</td>

                    </tr>
                    )
            }))

        })



    },[])
    
    
    return (
       
            
            <Container className="text-center">
                <h1 className="mt-3">My Orders</h1>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Product Id</th>
                            <th>Purchased On</th>
                        </tr>
                    </thead>
                    <tbody>
                       {orders}
                    </tbody>
                </Table>
            </Container>
          
        
    )
}

export default MyOrders;