import { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import HammerTime from '../images/hammertime.gif'

export default class AccessDenied extends Component {
	render() {
		return (
			<Container as="main" className="page-content col-xxl-8 px-4 py-5 js-flex-override">
				<Row className="align-items-center g-5 py-5">
					<Col>
						<Image src={HammerTime} />
					</Col>
					<Col>
						<h1 className="display-5 fw-bold lh-1 mb-3">
							Can't touch this!
						</h1>
						<p className="lead">
							Auf diese Seite dürfen Sie nicht zugreifen.
						</p>
					</Col>
				</Row>
			</Container>
		)
	}
}