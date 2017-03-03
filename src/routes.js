import React from "react";
import {Router, Route, IndexRoute, hashHistory, withRouter} from "react-router";
import Storage from "api/Storage";
import * as properties from "./properties";
import Main from "layout/Main.jsx";
import About from "public/About.jsx";
import ForgotPassword from "public/ForgotPassword.jsx";
import Login from "public/Login.jsx";
import Home from "protected/Home/Home.jsx";
import ListCustomers from "protected/Customers/ListCustomers.jsx";
import ListInvoices from "protected/Invoices/ListInvoices.jsx";
import ListPayments from "protected/Payments/ListPayments.jsx";
import ListSubscriptions from "protected/Subscriptions/ListSubscriptions.jsx";
import ManageRoles from "protected/Settings/ManageRoles.jsx";
import MyCompany from "protected/Settings/MyCompany.jsx";
import CustomerForm from "protected/Customers/CustomerForm.jsx";
import SubscriptionForm from "protected/Subscriptions/SubscriptionForm.jsx";
import ResetPassword from "protected/ResetPassword/ResetPassword.jsx";
import ValidationWorkflow from "protected/Orders/ValidationWorkflow.jsx";


@withRouter
export default class Routes extends React.Component {

	checkAuthorization(next, replace) {
		const user = Storage.getUser();
		if (!user && next.location.pathname.indexOf(properties.secured) >= 0) {
			// not logged in, redirect to login page.
			replace(properties.root);
		}
	}

	// Please keep routes in alphabetical order by route.
	render() {
		return (
			<Router history={hashHistory}>
				<Route component={Main}>
					<IndexRoute component={Login}/>

					<Route path={properties.about.route} component={About}/>
					<Route path={properties.forgot_password.route} component={ForgotPassword}/>
					<Route path={properties.index_url.route} component={Login}/>
					<Route path={properties.reset_password.route} component={ResetPassword}/>
					<Route path={properties.root} component={Login}/>

					<Route path={properties.secured} onEnter={this.checkAuthorization}>
						<IndexRoute component={Home}/>
						<Route path={properties.home.route} component={Home}/>
						<Route path={properties.customers.route}>
							<IndexRoute component={ListCustomers}/>
							<Route path={properties.edit_customer.route} component={CustomerForm}/>
							<Route path={properties.new_customer.route} component={CustomerForm}/>
						</Route>
						<Route path={properties.invoices.route} component={ListInvoices}/>
						<Route path={properties.payments.route} component={ListPayments}/>
						<Route path={properties.subscriptions.route}>
							<IndexRoute component={ListSubscriptions}/>
							<Route path={properties.subscriptions.route} component={ListSubscriptions}/>
							<Route path={properties.view_subscription.route} component={SubscriptionForm}/>
						</Route>
						<Route path={properties.orders.route}>
							<Route path={properties.validation_workflow.route} component={ValidationWorkflow}/>
						</Route>
						<Route path={properties.settings.route}>
							<Route path={properties.manage_roles.route} component={ManageRoles}/>
							<Route path={properties.my_company.route} component={MyCompany}/>
						</Route>
					</Route>
				</Route>
			</Router>
		);
	}
}