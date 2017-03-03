import React from "react";
import {withRouter} from "react-router";
import * as properties from "opencell/properties";

@withRouter
export default class Sidebar extends React.Component {

	goToOffers(subscription, event) {
		event.preventDefault();
		this.props.router.push({
			pathname: properties.customer_offers.path,
			state: {
				subscription
			}
		});
	}

	goToUsages(subscription, event) {
		event.preventDefault();
		this.props.router.push({
			pathname: properties.customer_usages.path,
			state: {
				subscription
			}
		});
	}

	goToBills(subscription, event) {
		event.preventDefault();
		this.props.router.push({
			pathname: properties.customer_bills.path,
			state: {
				subscription
			}
		});
	}

	goToCancellation(subscription, event) {
		event.preventDefault();
		//TODO implement cancellation
	}

	render() {
		const {subscriptions = []} = this.props;
		return (
			<div>
				{ subscriptions.length > 0 ?
					subscriptions.map(subscription => {
						const {offerTemplate = {}} = subscription || {};
						return (
							<div class="panel panel-default" key={subscription.code}>
								<div class="panel-heading">
									<h3 class="panel-title">{offerTemplate.name}</h3>
								</div>
								<div class="panel-body">
									<ul class="list-unstyled">
										<li><a onClick={this.goToOffers.bind(this, subscription)}>Offers</a>
										</li>
										<li><a onClick={this.goToUsages.bind(this, subscription)}>Usages</a>
										</li>
										<li><a onClick={this.goToBills.bind(this, subscription)}>Bills</a>
										</li>
										<li><a onClick={this.goToCancellation.bind(this, subscription)}>Cancellation</a></li>
									</ul>
								</div>
							</div>
						);
					})
					:
					<div class="panel-msg-info">
						<h3>You have no offer yet, go to shop first <i class="fa fa-2x fa-smile-o" aria-hidden="true"></i></h3>
					</div>
				}
			</div>
		)
	}
}
