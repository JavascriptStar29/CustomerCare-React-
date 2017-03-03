import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router";
import * as UserActions from "modules/UserModule";

@withRouter
@connect((store) => {
	return {
		currentUser: store.user.user,
	};
})
export default class Home extends React.Component {
	constructor() {
		super();
	}
	render() {
		const {currentUser} = this.props;
		return (
			<div class="container page-content">
				<div class="row">
					<div class="col-md-12">
						<h1>{'Welcome '}{currentUser.name.firstName}{' '}{currentUser.name.lastName}</h1>
					</div>
				</div>
			</div>
		);
	}
}
