import {Row, Col, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default function Error(){

	return(
		<Row>
			<Col className = "p-5">
				<h1>Page Not Found!</h1>	
				
				<Button as={Link} to ="/" variant="danger">Back to Homepage</Button>
			</Col>

		</Row>

		)

}