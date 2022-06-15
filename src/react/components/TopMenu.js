import React, { Component } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import UserSessionWidget from './UserSessionWidget'
import BHTLogo from '../../images/BHT_Logo_horizontal_Anthrazit_transparent.svg'

class TopMenu extends Component {

	render() {
		return (
			<>
				<Navbar bg="light" expand="lg" sticky="top">
					<Container fluid>
						<Navbar.Brand href="#home">
							<img width="204" height="60" src={BHTLogo} className="d-inline-block align-center" alt="BHT Logo" />
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link href="#home">Home</Nav.Link>
							</Nav>
						</Navbar.Collapse>
						<UserSessionWidget />
					</Container>
				</Navbar>
			</>
		)
	}
}

export default TopMenu