import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer(){

	return (
		<Container as="footer" fluid className="bg-dark py-3 text-center">
			<Row>
				<Col>
					<p className="mb-0 fw-bold text-white">&copy; 2022 Jonas Spaller</p>
				</Col>
			</Row>
		</Container>
	)
}

export default Footer