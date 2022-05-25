import React, { Component } from "react"
import { Navbar, Container, Nav, NavDropdown, Button, Modal, Form } from "react-bootstrap"

class TopMenu extends Component {

	initialState = {
		showLoginModal: false,
		username: '',
		password: ''
	}

	state = this.initialState

	handleOpen = () => this.setState({ showLoginModal: true })
	handleClose = () => this.setState({ showLoginModal: false })

	handleChange = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value,
		})
	}

	render() {

		const { username, password } = this.state;

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
							<Button id="OpenLoginDialogButton" variant="outline-primary" onClick={this.handleOpen}>
								Login
							</Button>
						</Navbar.Collapse>
					</Container>
				</Navbar>

				<Modal show={this.state.showLoginModal} onHide={this.handleClose} centered>

					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
								<Form.Text className="text-muted">
									{this.state.username}
								</Form.Text>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
								<Form.Text className="text-muted">
									{this.state.password}
								</Form.Text>
							</Form.Group>
						</Form>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>Close</Button>
						<Button variant="primary" onClick={this.handleClose}>Login</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default TopMenu