import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getHideConfirmAction } from "../../redux/user/UserManagementActions";

const mapStateToProps = state => {
	return state
}

class ConfirmUserDelete extends Component {

	handleClose = () => {
		const {hideConfirmAction} = this.props
		hideConfirmAction()
	}

	handleConfirm = () => {
		this.handleClose()
		this.props.callBack()
	}

	render(){

		let showConfirm = this.props.userManagementReducer.showDeleteConfirm
		if (showConfirm === undefined) {
			showConfirm = false
		}

		return (

			<Modal show={showConfirm} onHide={this.handleClose} centered>
				<Modal.Header closeButton>
					Löschen best&auml;tigen
				</Modal.Header>
				<Modal.Body>
					Wollen Sie diesen Nutzer wirklich l&ouml;schen?
				</Modal.Body>
				<Modal.Footer>
					<Button id="DeleteUserConfirm" variant="custom" onClick={this.handleConfirm}>Ja</Button>
					<Button id="DeleteUserCancel" variant="danger" onClick={this.handleClose}>Nein</Button>
				</Modal.Footer>
			</Modal>
		)
	}

}

const mapDispatchToProps = dispatch => bindActionCreators ({
	hideConfirmAction: getHideConfirmAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUserDelete)