import React, { Component } from "react"
import { Container, Card, Button, Row, Col } from "react-bootstrap"

class PublicPage extends Component {

	render() {
		return (
			<Container className="page-content" id="LandingPage">
				<Row lg={3} md={2} className="g-5 mt-0">
					<Col md={4}>
						<Card>
							<Card.Img variant="top" src="https://plchldr.co/i/100x60" />
							<Card.Body>
								<Card.Title>Card Title</Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of
									the card's content.
								</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>
						</Card>
					</Col>

					<Col md={4}>
						<Card>
							<Card.Img variant="top" src="https://plchldr.co/i/100x60" />
							<Card.Body>
								<Card.Title>Card Title</Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of
									the card's content.
								</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>
						</Card>
					</Col>

					<Col md={4}>
						<Card>
							<Card.Img variant="top" src="https://plchldr.co/i/100x60" />
							<Card.Body>
								<Card.Title>Card Title</Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of
									the card's content.
								</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default PublicPage