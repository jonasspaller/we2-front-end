import { Modal, Button } from 'react-bootstrap'

function LoginModal(props) {

	useEffect(() => {
		props.setShowLoginModal(false)
	}, [])

	return (
		<Modal show={props.showLoginModal} centered>
			<Modal.Header closeButton>
				<Modal.Title>Modal title</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p>Modal body text goes here.</p>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={this.handleClick}>Close</Button>
				<Button variant="primary" onClick={this.handleClick}>Save changes</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default LoginModal