import { Card, Button } from "react-bootstrap"

const UserCard = ({ userID, userName, isAdministrator }) => {

	return (

		<Card>
			<Card.Img variant="top" src="https://plchldr.co/i/100x60" />
			<Card.Body>
				<Card.Title>{userID}</Card.Title>
				<Card.Text>Username: {userName}</Card.Text>
				<Card.Text>Administrator: {isAdministrator ? 'Ja' : 'Nein'}</Card.Text>
				<Button variant="primary">Bearbeiten</Button>
			</Card.Body>
		</Card>
	)
}

export default UserCard