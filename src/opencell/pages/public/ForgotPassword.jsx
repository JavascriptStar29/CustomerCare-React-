import React from "react";
import {connect} from "react-redux";
import Spinner from "common/Spinner.jsx";
import * as UserActions from "modules/UserModule";

@connect((store) => {
	return {
		isLoading: store.isLoading,
		error: store.error
	};
})
export default class ForgotPassword extends React.Component {

	constructor() {
		super();
		this.state = {
			emailAddress: ''
		}
	}

	changeField(field, e) {
		var newState = {};
		newState[field] = e.target.value;
		this.setState(newState);
	}

	navigateBack() {
		this.context.router.goBack();
	}

	renderLoader() {
		this.setState({
			isLoading: true,
			error: null
		});
	}

	renderError(error) {
		this.setState({
			isLoading: false,
			error: error
		});
	}

	redirectOnUpdate() {
		this.setState({
			isLoading: false,
			error: null
		});
		window.scrollTo(0, 0);
		render(
			<div className="alert alert-success">
				We have sent you an email with a link to reset your password at: {this.state.email}.
			</div>,
			document.getElementById("alert_msg")
		);

	}

	displayError() {
		const {error} = this.state;
		if (error == null) {
			return;
		} else {
			window.scrollTo(0, 0);
			return (
				<div className="alert alert-danger">
					<strong>Error!</strong> {error.message}.
				</div>
			);
		}
	}

	forgotPassword(event) {
		UserActions.forgotPassword(this.state.email);
	}

	render() {
		const {isLoading} = this.props;
		return (
			<div class="container page-content">
				<div class="row">
					<div className="col-md-12 container-form">
						<div className="form_header text-center">
							<h2>
								You do not know your password ?
							</h2>
							<p>
								Please enter your email address to retrieve it
							</p>
						</div>
						<form method="post" onSubmit={this.forgotPassword.bind(this)}>
							<div className="form-group ">
								<input className="form-control input-lg"
									   onChange={this.changeField.bind(this, 'emailAddress')} id="emailAddress"
									   name="emailAddress" placeholder="Email address" type="email" required/>
							</div>
							<div className="form-group">
								<div>
									<button className="btn btn-default btn-sm pull-left" type="button"
											onClick={this.navigateBack}>
										Back
									</button>
									<button className="btn btn-success btn-sm pull-right" name="submit"
											type="submit">
										Continue
										<Spinner isLoading={isLoading}/>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}