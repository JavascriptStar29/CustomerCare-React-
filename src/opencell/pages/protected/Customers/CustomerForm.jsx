import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router";
import Spinner from "common/Spinner.jsx";
import * as properties from "opencell/properties";
import * as CustomerActions from "modules/CustomerModule";


@withRouter
@connect(store => {
	return {
		isLoading: store.page.isLoading,
		status: store.customer.status
	}
})
export default class CustomerForm extends React.Component {

	constructor() {
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
		const {account, isEdit, isNew} = this.props.location.state || {};
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
		}
		this.setState({
			form: newForm,
			isNew,
			isEdit
		});
	}

	shouldComponentUpdate(nextProps){
		if(nextProps.status.saved){
			this.props.dispatch(CustomerActions.clearStatus());
			this.props.router.push(properties.customers.path);
			return false;
		}
		return true;
	}

	createNewCustomer(event) {
		event.preventDefault();
		const {form} = this.state;
		this.props.dispatch(CustomerActions.newCustomer(form));
	}

	updateCustomer(event) {
		event.preventDefault();
		const {form} = this.state;
		this.props.dispatch(CustomerActions.updateCustomer(form));
	}

	search() {
		// TODO do search
	}

	changeField(field, event) {
		const {form} = this.state;
		form[field] = event.target.value;
		this.setState({
			form
		});
	}

	render() {
		const {form, isEdit, isNew} = this.state;
		const isEditable = isEdit || isNew;
		return (
			<div class="container page-content">
				<div class="row">
					<div class="col-md-12">

						<ol class="breadcrumb">
							<li><Link to={properties.customers.path}>Customers</Link></li>
							<li class="active">New Customer</li>
						</ol>


						<div class="row">
							<div class="col-xs-offset-1 col-xs-10">
								<div class="row">
									{ isNew ?
										<h1>
											Create New User
										</h1>
										:
										<h1>
											Customer Account Details
										</h1>
									}
									{ isEditable ?
										<p>
											Please enter the customer's details.
										</p>
										:
										<p>
											Customer account detailed information.
										</p>
									}

								</div>
								<div class="row">
									<form id="new-customer-form" class="form-horizontal col-md-9" onSubmit={isNew ? this.createNewCustomer.bind(this) : this.updateCustomer.bind(this)}>
										<fieldset>
											<legend>Basic Information</legend>
											<div class="form-group ">
												<label for="userName" class="control-label col-sm-2">User Name</label>
												{ isNew ?
													<div class="col-sm-10">
														<input id="userName"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'userName')}
															   value={form.userName}
															   placeholder="User Name"
															   type="text" required/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.userName}
													</div>
												}

											</div>
											<div class="form-group ">
												<label for="email" class="control-label col-sm-2">Email</label>
												{ isEditable ?
													<div class="col-sm-10">
														<input id="email"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'email')}
															   value={form.email}
															   placeholder="Email"
															   type="email" required/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.email}
													</div>
												}

											</div>
											<div class="form-group ">
												<label for="firstName" class="control-label col-sm-2">First Name</label>
												{ isEditable ?
													<div class="col-sm-10">
														<input id="firstName"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'firstName')}
															   placeholder="First Name"
															   value={form.firstName}
															   type="text" required/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.firstName}
													</div>
												}
											</div>
											<div class="form-group ">
												<label for="lastName" class="control-label col-sm-2">Last Name</label>
												{ isEditable ?
													<div class="col-sm-10">
														<input id="lastName"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'lastName')}
															   value={form.lastName}
															   placeholder="Last Name"
															   type="text" required/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.lastName}
													</div>
												}
											</div>
										</fieldset>
										<fieldset>
											<legend>Address Information</legend>
											<div class="form-group">
												<label for="address1" class="control-label col-sm-2">Address 1</label>
												{ isEditable ?
													<div class="col-sm-10">
														<input id="address1"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'address1')}
															   value={form.address1}
															   placeholder="Address 1"
															   type="text" required/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.address1}
													</div>
												}
											</div>
											<div class="form-group">
												<label for="address2" class="control-label col-sm-2">Address 2</label>
												{ isEditable ?
													<div class="col-sm-10">
														<input id="address2"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'address2')}
															   value={form.address2}
															   placeholder="Address 2"
															   type="text"/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.address2}
													</div>
												}
											</div>
											<div class="form-group">
												<label for="address3" class="control-label col-sm-2">Address 3</label>
												{ isEditable ?
													<div class="col-sm-10">
														<input id="address3"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'address3')}
															   value={form.address3}
															   placeholder="Address 3"
															   type="text"/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.address3}
													</div>
												}
											</div>
											<div class="form-group ">
												<label for="city" class="control-label col-sm-2">City</label>
												{ isEditable ?
													<div class="col-sm-10">
														<input id="city"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'city')}
															   value={form.city}
															   placeholder="City"
															   type="text" required/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.city}
													</div>
												}
											</div>
											<div class="form-group ">
												<label for="state" class="control-label col-sm-2">State</label>
												{ isEditable ?
													<div class="col-sm-10">
														<input id="state"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'state')}
															   value={form.state}
															   placeholder="State"
															   type="text" required/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.state}
													</div>
												}
											</div>
											<div class="form-group ">
												<label for="country" class="control-label col-sm-2">Country</label>
												{ isEditable ?
													<div class="col-sm-10">
														<input id="country"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'country')}
															   value={form.country}
															   placeholder="Country"
															   type="text" required/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.country}
													</div>
												}
											</div>
											<div class="form-group ">
												<label for="zipCode" class="control-label col-sm-2">Zip Code</label>
												{ isEditable ?
													<div class="col-sm-10">
														<input id="zipCode"
															   class="form-control"
															   onChange={this.changeField.bind(this, 'zipCode')}
															   value={form.zipCode}
															   placeholder="Zip Code"
															   type="text" required/>
													</div>
													:
													<div class="col-sm-10 form-control-static">
														{form.zipCode}
													</div>
												}
											</div>
										</fieldset>
										<div class="form-group">
											<div class="col-sm-offset-2 col-sm-10">
												<Link to={properties.customers.path} class="btn btn-danger">
													Cancel
												</Link>
												{ isEditable ?
													<button class="btn btn-primary pull-right" name="submit" type="submit"
															disabled={this.props.isLoading}>
														Save
														<Spinner isLoading={this.props.isLoading}/>
													</button> : null
												}
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>


					</div>
				</div>
			</div>
		);
	}
}
