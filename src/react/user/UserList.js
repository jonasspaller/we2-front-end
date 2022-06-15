import React from "react"
import { Container } from "react-bootstrap"
import UserCard from "./UserCard"

const UserList = ({users}) => {
	
	return(

		<Container>
			{users.map((user, i) => {
				return(<UserCard key={i} userID={user.userID} userName={user.userName} isAdministrator={user.isAdministrator} />)
			})}
		</Container>
	)
}

export default UserList