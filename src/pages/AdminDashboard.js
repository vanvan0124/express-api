import { useState, useEffect, useContext } from 'react';
import { Container, Table, Button} from "react-bootstrap";
import {Navigate, Link, useParams, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from 'sweetalert2'

export default function Admin(){


	const {user} = useContext(UserContext);
    const [products, setProducts] = useState();


    function archive(productId){
        fetch(`http://localhost:4000/products/archiveProduct/${productId}`, {
            method :'PUT',
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => 
            Swal.fire({
                    title: "Successfully Archive",
                    icon: "success",
                    text: "The item will be shown in the shop."
            })

            )

    }



    useEffect(()=>{
    	fetch('http://localhost:4000/products',{
    		headers: {
    			"Content-Type" : "application/json",
    			Authorization : `Bearer ${localStorage.getItem("token")}`

    		}

    	})
    	.then(res=>res.json())
    	.then(data=> {

    		setProducts(data.map(product=>{

    			

    			return (

    				<tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <Button variant ="info" className="px-3">Edit</Button> 
                        <Button variant ="primary"  onClick = {e => archive(product._id)}>Archive</Button> 
                    </tr>

    				)


    		}))

    	})









    },[])

	return(


		<Container className="text-center">
                <h1 className="mt-3">Active Products</h1>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product Price</th>
                        </tr>
                    </thead>
                    <tbody>
                       {products}
                    </tbody>
                </Table>
                <Button variant ="primary" >Add Products</Button> 
            </Container>





		)


}