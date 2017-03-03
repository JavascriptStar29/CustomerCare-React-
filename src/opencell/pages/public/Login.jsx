import React from "react";
import {Link, withRouter} from "react-router";
import {connect} from "react-redux";
import Spinner from "common/Spinner.jsx";
import * as UserActions from "modules/UserModule";
import * as properties from "opencell/properties";

@withRouter
@connect((store) => {
	return {
		isLoading: store.page.isLoading,
		currentUser: store.user.user
	};
})
export default class Login extends React.Component {

	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}
	}

	shouldComponentUpdate(nextProps) {
		if (!this.props.currentUser && !nextProps.currentUser) {
			return true;
		}
		this.props.router.push(properties.home.path);
		return false;
	}

	changeField(field, e) {
		const newState = {};
		newState[field] = e.target.value;
		this.setState(newState);
	}

	login(event) {
		event.preventDefault();
		this.props.dispatch(UserActions.login(this.state));
	}

	render() {
		let {isLoading} = this.props;
		return (
			<div class="login-page small-navbar container page-content">
				<div class="container-form col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4">
					<div class="form_header text-center">
						<h2>Login to Customer Care</h2>
						<p>Please enter your username and password to access your account.</p>
					</div>
					<form method="post" onSubmit={this.login.bind(this)}>
						<div class="form-group ">
							<label class="control-label requiredField" htmlFor="username">
								Username<span class="asteriskField">*</span>
							</label>
							<div class="input-group">
								<div class="input-group-addon">
									<i class="fa fa-user"/>
								</div>
								<input class="form-control" onChange={this.changeField.bind(this, "username")} id="username" name="username" type="text" required/>
							</div>
						</div>
						<div class="form-group ">
							<label class="control-label requiredField" htmlFor="password">
								Password<span class="asteriskField">*</span>
							</label>
							<div class="input-group">
								<div class="input-group-addon">
									<i class="fa fa-lock"/>
								</div>
								<input class="form-control" onChange={this.changeField.bind(this, 'password')} id="password" name="password" type="password" required/>
							</div>
						</div>
						<div class="form-group">
							<div>
								<button class="btn btn-theme-default btn-lg btn-block" name="submit" type="submit">
									Let&#39;s go <Spinner isLoading={isLoading}/>
								</button>
							</div>
						</div>
					</form>
					<div class="form-group">
						<Link to={properties.forgot_password.path}>You forgot your password?</Link>
					</div>
				</div>
			</div>
		)
	}
}
