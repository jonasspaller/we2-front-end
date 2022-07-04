import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getHideConfirmAction } from "../../redux/forum/ForumThreadActions";

const mapStateToProps = state => {
	return {
		token: state.authenticationReducer.accessToken,
		showDeleteThreadConfirm: state.forumThreadReducer.showDeleteThreadConfirm
	}
}

const mapDispatchToProps = dispatch => bindActionCreators ({
	hideConfirmAction: getHideConfirmAction
}, dispatch)

class ConfirmThreadDelete extends Component {

	handleClose = () => {
		const {hideConfirmAction} = this.props
		hideConfirmAction()
	}

	handleConfirm = () => {
		this.handleClose()
		this.props.callBack()
	}

	render(){

		let showDeleteThreadConfirm = this.props.showDeleteThreadConfirm
		if (showDeleteThreadConfirm === undefined) {
			showDeleteThreadConfirm = false
		}

		return (

			<Modal show={showDeleteThreadConfirm} onHide={this.handleClose} centered>
				<Modal.Header closeButton>
					Löschen best&auml;tigen
				</Modal.Header>
				<Modal.Body>
					Wollen Sie diesen Thread wirklich l&ouml;schen?
				</Modal.Body>
				<Modal.Footer>
					<Button id="DeleteForumThreadConfirm" variant="custom" onClick={this.handleConfirm}>Ja</Button>
					<Button id="DeleteForumThreadCancel" variant="danger" onClick={this.handleClose}>Nein</Button>
				</Modal.Footer>
			</Modal>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmThreadDelete)