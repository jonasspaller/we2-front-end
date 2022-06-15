import React, { Component } from "react"
import { Container, Card, Button, Row, Col, Image } from "react-bootstrap"
import LoginButton from "./LoginButton"

class PublicPage extends Component {

	render() {
		return (
			<main className="page-content" id="LandingPage">
				<Container fluid className="col-xxl-8 px-4 py-5">
					<Row className="align-items-center g-5 py-5">
						<Col>
							<h1 className="display-5 fw-bold lh-1 mb-3">
								Gesprächsbedarf?
							</h1>
							<p className="lead">
								Tauschen Sie sich im BHT Forum mit anderen Dozenten, Mitarbeitern oder Studenten aus.
							</p>
							<LoginButton />
						</Col>
						<Col>
							<Image src="https://plchldr.co/i/432x308" />
						</Col>
					</Row>
				</Container>
				<Container>
					<Row lg={3} md={2} className="g-5 mt-0">
						<Col md={4}>
							<Card>
								<Card.Img variant="top" src="https://plchldr.co/i/398x239" />
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
								<Card.Img variant="top" src="https://plchldr.co/i/398x239" />
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
								<Card.Img variant="top" src="https://plchldr.co/i/398x239" />
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
			</main>
		)
	}
}

export default PublicPage