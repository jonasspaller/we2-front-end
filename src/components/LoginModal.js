import { Modal, Button } from 'react-bootstrap'

function LoginModal(props) {

	return (
		<Modal.Dialog centered>
			<Modal.Header closeButton>
				<Modal.Title>Modal title</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p>Modal body text goes here.</p>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
				<Button variant="primary" onClick={handleClose}>Save changes</Button>
			</Modal.Footer>
		</Modal.Dialog>
	)
}

export default LoginModal