import { Navbar, Nav, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import { getShowThreadOverviewAction } from "../../redux/forum/ForumThreadActions";

const mapStateToProps = state => {
	return state
}

const mapDispatchToProps = dispatch => bindActionCreators({
	showThreadOverviewAction: getShowThreadOverviewAction
}, dispatch)

function ActivityBar(props){

	let navigate = useNavigate()

	const navigateToThreadOverView = e => {
		e.preventDefault()

		const { showThreadOverviewAction } = props
		showThreadOverviewAction()
		navigate("/forumPage")
	}

	const user = props.authenticationReducer.user
	const token = props.authenticationReducer.accessToken

	// return null if user or accessToken are not set
	if(!user || !token) return null

	return (
		<Navbar bg="dark" variant="dark" expand="lg" sticky="top" id="activity-bar">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{user.isAdministrator ? <Link to="/userManagement" id="OpenUserManagementButton" className="nav-link"><i className="fa-solid fa-user-group custom-mr"></i>Nutzerverwaltung</Link> : ''}
						<Nav.Link id="OpenForumThreadOverviewButton" className="nav-link" onClick={navigateToThreadOverView}><i className="fa-solid fa-comments custom-mr"></i>Foren&uuml;bersicht</Nav.Link>
						{/*<Link to="/forumPage" id="OpenForumThreadOverviewButton" className="nav-link"><i className="fa-solid fa-comments custom-mr"></i>Foren&uuml;bersicht</Link>*/}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityBar)