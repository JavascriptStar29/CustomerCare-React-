import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router";
import * as SubscriptionActions from "modules/SubscriptionsModule";
import * as properties from "opencell/properties";
import SubscriptionTable from "./SubscriptionTable.jsx";

@withRouter
@connect(store => {
	return {
		subscriptions: store.subscription.list
	}
})
export default class CustomerSubscriptions extends React.Component {
	
	constructor(){
		super();
		this.state = {
			form: {
				firstName: "",
				lastName: "",
				email: "",
				userName: "",
				address1: "",
				address2: "",
				address3: "",
				city: "",
				state: "",
				country: "",
				zipCode: "",
				password: "ccuser"
			}
		}
	}

	componentWillMount() {
		const {account} = this.props.location.state || {};
		const {form} = this.state;
		let newForm = {...form};
		if (!!account) {
			newForm = {
				...newForm,
				firstName: account.name.firstName || "",
				lastName: account.name.lastName || "",
				email: account.contactInformation.email || "",
				userName: account.code || "",
				address1: account.address.address1 || "",
				address2: account.address.address2 || "",
				address3: account.address.address3 || "",
				city: account.address.city || "",
				state: account.address.state || "",
				country: account.address.country || "",
				zipCode: account.address.zipCode || ""
			};
			this.props.dispatch(SubscriptionActions.fetchCustomerSubscriptions(account));
		}
		this.setState({
			form: newForm
		});
		
	}

	search() {
		// TODO do search
	}

	createNewSubscription(event){
		event.preventDefault();
		this.props.router.push({
			pathname: properties.new_subscription.path,
			state: {
				isNew: true
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
			<div class="container page-content">
				<div class="row">
					<div class="col-md-12">


						<ol class="breadcrumb">
							<li><Link to={properties.subscriptions.path}>Customers</Link></li>
							<li class="active">Subscriptions</li>
						</ol>


						<div class="row">
							<div class="col-sm-offset-6 col-sm-6  col-md-offset-8 col-md-4">
								<form class="form-group" onSubmit={this.search.bind(this)}>
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-search"/></span>
										<input type="text" class="form-control" aria-label="Search Subscriptions List" placeholder="Search"/>
										<button type="submit" class="sr-only">Search</button>
									</div>
								</form>
							</div>
						</div>


						<div class="row">

							<div class="col-md-2 col-lg-4 vertical-middle text-center-sm">
								<a onClick={this.createNewSubscription.bind(this)}><i class="fa fa-plus"/> Add a new subscription</a>
							</div>


							<div class="table-controls col-md-10 col-lg-8 vertical-middle text-center-sm">
								<div class="row">
									<div class="filter-container col-md-6">
										<div class="filter-group">
											<label for="sort-dropdown">Sort by: </label>
											<select id="sort-dropdown" class="form-control">
												<option>Last Modified Date</option>
												<option>Account Name</option>
												<option>Site</option>
												<option>Industry</option>
												<option>Billing city</option>
												<option>Billing state/province</option>
												<option>Account Owner</option>
											</select>
											<select id="rows-per-page" class="form-control">
												<option>20</option>
												<option>50</option>
												<option>100</option>
												<option>All</option>
											</select>
										</div>
									</div>
									<div class="pagination-container col-md-6">
										<nav aria-label="Subscription List pagination" class="pagination-group">
											<ul class="pagination">
												<li>
													<a href="#" aria-label="Previous" class="pagination-first">
														<span aria-hidden="true"><i class="fa fa-fast-backward"/></span>
													</a>
												</li>
												<li>
													<a href="#" aria-label="Previous" class="pagination-previous">
														<span aria-hidden="true"><i class="fa fa-step-backward"/></span>
													</a>
												</li>
												<li><a href="#">1</a></li>
												<li><a href="#">2</a></li>
												<li><a href="#">3</a></li>
												<li><a href="#">4</a></li>
												<li><a href="#">5</a></li>
												<li>
													<a href="#" aria-label="Next" class="pagination-next">
														<span aria-hidden="true"><i class="fa fa-step-forward"/></span>
													</a>
												</li>
												<li>
													<a href="#" aria-label="Next" class="pagination-first">
														<span aria-hidden="true"><i class="fa fa-fast-forward"/></span>
													</a>
												</li>
											</ul>
										</nav>
									</div>
								</div>
							</div>
						</div>


						<SubscriptionTable {...this.props}/>
					</div>
				</div>
			</div>
		);
	}
}