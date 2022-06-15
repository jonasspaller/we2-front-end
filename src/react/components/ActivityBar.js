import { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = state => {
	return state
}

class ActivityBar extends Component {

	render(){

		const user = this.props.authenticationReducer.user
		const token = this.props.authenticationReducer.accessToken

		// return null if user or accessToken are not set
		if(!user || !token) return null

		return (
			<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
				<Container>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							{user.isAdministrator ? <Link to="/userManagement" id="OpenUserManagementButton" className="nav-link">Nutzerverwaltung</Link> : ''}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		)
	}
}

export default connect(mapStateToProps)(ActivityBar)