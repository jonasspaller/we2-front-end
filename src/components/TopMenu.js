import React, { Component } from "react"
import { Navbar, Container, Nav, NavDropdown, Button, Modal } from "react-bootstrap"

class TopMenu extends Component {

	constructor(props){
		super(props)
		this.state = {
			showLoginModal: false,
			text: 'Hello State!'
		}
	}

	showLoginDialog = () => {
		console.log(this.state.showLoginModal)
		this.setState({showLoginModal: true})
	}

	render() {
		return (
			<>
				<Navbar bg="light" expand="lg">
					<Container>
						<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link href="#home">Home</Nav.Link>
								<Nav.Link href="#link">Link</Nav.Link>
								<NavDropdown title="Dropdown" id="basic-nav-dropdown">
									<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
								</NavDropdown>
							</Nav>
							<Button id="OpenLoginDialogButton" variant="outline-primary" onClick={this.showLoginDialog}>
								Login
							</Button>
							<p>{this.state.text}</p>
						</Navbar.Collapse>
					</Container>
				</Navbar>

				<Modal.Dialog show={this.state.showLoginModal} centered>
					<Modal.Header closeButton>
						<Modal.Title>Modal title</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Modal body text goes here.</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={this.showLoginDialog}>Close</Button>
						<Button variant="primary" onClick={this.showLoginDialog}>Save changes</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</>
		)
	}
}

export default TopMenu