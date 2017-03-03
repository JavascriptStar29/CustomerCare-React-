import React from "react";
import * as properties from "opencell/properties";
var moment = require('moment');

export default class SubscriptionTable extends React.Component {

	viewSubscription(subscription, event){
		event.preventDefault();
		//TODO: view subscription form
		//pathname : properties.view_subscription.path
		this.props.router.push({
			pathname: properties.subscriptions.path,
			state: {
				subscription
			}
		});
	}

	formatDate(jsonDate){
		if(jsonDate === "" || jsonDate == null){
			return "";
		}
		return moment(jsonDate).format('LL')
	}

	render() {
		const {subscriptions = []} = this.props;
		return (
			<div class="row">
				<div class="table-responsive col-md-12">
					<table class="table table-hover">
						<thead>
						<tr>
							<th>Account Name</th>
							<th>Code</th>
							<th>Description</th>
							<th>Offer</th>
							<th>Activation Date</th>
							<th>Termination Date</th>
							<th>End of agreement</th>
							<th>Status</th>
						</tr>
						</thead>
						<tbody>
						{(subscriptions.length > 0) ?
							subscriptions.map(subscription => {
								return (
									<tr key={subscription.code}>
										<td><a onClick={this.viewSubscription.bind(this, subscription)}>{subscription.userAccount}</a></td>
										<td>{subscription.code}</td>
										<td>{subscription.description}</td>
										<td>{subscription.offerTemplate.code}</td>
										<td>{this.formatDate(subscription.subscriptionDate)}</td>
										<td>{this.formatDate(subscription.terminationDate)}</td>
										<td>{this.formatDate(subscription.endAgreementDate)}</td>
										<td>{subscription.status}</td>
									</tr>
								);
							}) :
							(
								<tr>
									<td colSpan="7"><h1>No subscriptions found yet.</h1></td>
								</tr>
							)
						}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

}