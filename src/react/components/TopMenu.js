import React, { Component } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import UserSessionWidget from './UserSessionWidget'
import BHTLogo from '../../images/BHT_Logo_horizontal_Anthrazit_transparent.svg'
import { Link } from "react-router-dom"

class TopMenu extends Component {

	render() {
		return (
			<>
				<Navbar bg="light" expand="lg">
					<Container fluid>
						<Navbar.Brand href="/">
							<img width="204" height="60" src={BHTLogo} className="d-inline-block align-center" alt="BHT Logo" />
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Link to="/" className="nav-link"id="OpenPrivatePageButton">Home</Link>
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