import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router";
import Spinner from "common/Spinner.jsx";
import * as properties from "opencell/properties";
import * as SubscriptionActions from "modules/SubscriptionsModule";


@withRouter
@connect(store => {
	return {
		isLoading: store.page.isLoading,
		status: store.subscription.status
	}
})

export default class SubscriptionForm extends React.Component {

	constructor(){
		super();
		this.state = {
			form: {
				code : "",
				description : ""
			}
		}
	}

	componentWillMount() {
		const {subscription} = this.props.location.state || {};
		const {form} = this.state;
		let newForm = {...form};
		if (!!subscription) {
			newForm = {
				...newForm,
				code: subscription.code || "",
				description: subscription.description|| ""
			};
		}
		this.setState({
			form: newForm
		});
	}

	render(){
		const {form} = this.state;
		return (
			<div class="container page-content">
				<div class="row">
					<div class="col-md-12">
						<h1>{'View Subscription '}{form.code}{' '}{form.description}</h1>
					</div>
				</div>
			</div>
			);
	}		
}