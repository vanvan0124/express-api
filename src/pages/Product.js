import {useState, useEffect} from 'react'
import ProductCard from '../components/ProductCard'
import {Container, Row} from 'react-bootstrap'




const Product = () => {


	const [products, setProducts] = useState([])



	useEffect(() => {
		fetch('https://pure-hamlet-97702.herokuapp.com/products')
		.then(res => res.json())
		.then(data => {

			setProducts(data.map(product => {

				return(

					<ProductCard key={product._id} productProp={product}/>
					);

			}))
		})



	},[])


	return (
		<>
			
			<Container className = "my-5" >
			<Row  md={3} xs={12}>
			{products}
			</Row>
			</Container>
		</>	
		)

};

export default Product;