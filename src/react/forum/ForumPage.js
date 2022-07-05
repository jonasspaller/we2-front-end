import { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import SingleThreadView from "./SingleThreadView"
import ThreadOverview from "./ThreadOverview"

const mapStateToProps = state => {
	return {
		showSingleThread: state.forumThreadReducer.showSingleThread
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

class ForumPage extends Component {

	render(){

		let content
		if(this.props.showSingleThread){
			content = <SingleThreadView thread={this.props.showSingleThread} />
		} else {
			content = <ThreadOverview />
		}

		return (
			<>{content}</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumPage)