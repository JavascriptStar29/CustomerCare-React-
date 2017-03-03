import React from "react";
import {connect} from "react-redux";
import Spinner from "common/Spinner.jsx";

@connect((store) => {
	return {
		isLoading: store.page.isLoading,
		alert: store.page.alert,
		error: store.page.error
	};
})
export default class ResetPasswordComponent extends React.Component {

	constructor() {
		super();
		this.state = {
			loading: false,
			form: {
				new_password: ''
			}
		}
	}

	changeContent(name, e) {
		var state = this.state;
		state['form'][name] = e.target.value;
		this.setState(state);
	}

	navigateBack() {
		document.location = "index.html#/sign_in";
	}

	hideLoading() {
		this.setState({loading: false});
	}

	showLoading() {
		this.setState({loading: true});
	}

	reset_password(event) {

	}

	render() {
		const {isLoading} = this.props;
		return (
			<div class="container page-content">
				<div class="row">
					<div class="col-md-12">
						<div id="alert_msg" class="container-form-alert"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12 container-form">
						<div class="form_header text-center">
							<h2>
								Choose your new password
							</h2>
						</div>
						<form method="post" onSubmit={this.reset_password.bind(this)}>
							<div class="form-group ">
								<input class="form-control input-lg"
									   onChange={this.changeContent.bind(this, 'new_password')}
									   placeholder="New password" type="password" required/>
							</div>
							<div class="form-group ">
								<input class="form-control input-lg" id="confirm_password"
									   placeholder="Password confirmation" type="password" required/>
							</div>
							<div class="form-group">
								<div>
									<button class="btn btn-default btn-sm pull-left" type="button"
											onClick={this.navigateBack}>
										Back
									</button>
									<button class="btn btn-success btn-sm pull-right" name="submit"
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
