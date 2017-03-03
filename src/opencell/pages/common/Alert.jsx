import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class Alert extends React.Component {

	componentDidMount() {
		this.closeAlertTimer();
	}

	componentDidUpdate() {
		this.closeAlertTimer();
	}

	closeAlertTimer() {
		if (!!this.props.alert) {
			setTimeout(()=> {
				this.props.clearAlerts();
			}, this.props.timeOutMilliseconds || 3000);
		}
	}

	renderAlert() {
		if (!!this.props.alert) {
			const {alertClass, message} = this.props.alert || {};
			return (
				<div id="alert" class="row alert-container text-center">
					<div class="col-xs-12">
						<div class={alertClass}>
							{message}
						</div>
					</div>
				</div>
			);
		}
		return null;
	}

	render() {
		return (
			<ReactCSSTransitionGroup transitionName="alert"
									 transitionAppear={true}
									 transitionLeave={true}
									 transitionEnterTimeout={600}
									 transitionAppearTimeout={600}
									 transitionLeaveTimeout={300}>
				{this.renderAlert()}
			</ReactCSSTransitionGroup>
		);
	}
}