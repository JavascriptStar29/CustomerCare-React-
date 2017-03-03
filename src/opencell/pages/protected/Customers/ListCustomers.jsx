import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router";
import * as CustomerActions from "modules/CustomerModule";
import * as properties from "opencell/properties";


@withRouter
@connect(store => {
	return {
		customers: store.customer.list
	}
})
export default class ListCustomers extends React.Component {

	componentDidMount() {
		this.props.dispatch(CustomerActions.getCustomerList());
	}

	search() {
		// TODO do search
	}

	createNewAccount(event) {
		event.preventDefault();
		this.props.router.push({
			pathname: properties.new_customer.path,
			state: {
				isNew: true
			}
		});
	}

	editAccount(account, event) {
		event.preventDefault();
		this.props.router.push({
			pathname: properties.edit_customer.path,
			state: {
				isEdit: true,
				account
			}
		});
	}

	viewSubscriptions(account, event) {
		event.preventDefault();
		this.props.router.push({
			pathname: properties.subscriptions.path,
			state: {
				account
			}
		});
	}

	render() {
		const {customers = []} = this.props;
		return (
			<div class="container page-content">
				<div class="row">
					<div class="col-md-12">


						<ol class="breadcrumb">
							<li><Link to={properties.customers.path}>Customers</Link></li>
							<li class="active">List Customers</li>
						</ol>


						<div class="row">
							<div class="col-sm-offset-6 col-sm-6  col-md-offset-8 col-md-4">
								<form class="form-group" onSubmit={this.search.bind(this)}>
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-search"/></span>
										<input type="text" class="form-control" aria-label="Search Customers List" placeholder="Search"/>
										<button type="submit" class="sr-only">Search</button>
									</div>
								</form>
							</div>
						</div>


						<div class="row">

							<div class="col-md-2 col-lg-4 vertical-middle text-center-sm">
								<a onClick={this.createNewAccount.bind(this)}><i class="fa fa-plus"/> Add a new account</a>
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
										<nav aria-label="Customer List pagination" class="pagination-group">
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


						<div class="row">
							<div class="table-responsive col-md-12">
								<table class="table table-hover">
									<thead>
									<tr>
										<th>Acount name</th>
										<th>Site</th>
										<th>Industry</th>
										<th>Billing city</th>
										<th>Billing state/province</th>
										<th>Account owner</th>
										<th>&nbsp;</th>
									</tr>
									</thead>
									<tbody>
									{(customers.length > 0) ?
										customers.map(customer => {
											return (
												<tr key={customer.code}>
													<td><a onClick={this.viewSubscriptions.bind(this, customer)}>{customer.name.firstName} {customer.name.lastName}</a></td>
													<td>{customer.address.city}</td>
													<td>{customer.customerCategory}</td>
													<td>{customer.address.city}</td>
													<td>{customer.address.state}</td>
													<td>{customer.name.firstName} {customer.name.lastName}</td>
													<td><a onClick={this.editAccount.bind(this, customer)}><i class="fa fa-edit"/></a></td>
												</tr>
											);
										}) :
										(
											<tr>
												<td colSpan="7"><h1>No customers found yet.</h1></td>
											</tr>
										)
									}
									</tbody>
								</table>
							</div>
						</div>


					</div>
				</div>
			</div>
		);
	}
}
