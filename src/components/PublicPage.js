import React, {Component} from "react"
import LoginButton from './LoginButton'

class PublicPage extends Component {

	render(){
		return(
			<div className="page-content" id="LandingPage">
				<LoginButton />
			</div>
		)
	}
}

export default PublicPage