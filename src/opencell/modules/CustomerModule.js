import EventDispatcher from "framework/EventDispatcher";
import AccountHierarchy from "models/account/AccountHierarchy";
import Error from "models/Error";
import Client from "models/Client";
import Customer from "models/account/Customer";
import * as Opencell from "api/Opencell";
import Storage from "api/Storage";
import * as PageActions from "modules/PageModule";


// Action Types
const CLEAR_STATUS = 'customercare/modules/customer/CLEAR_STATUS';
const GET_CUSTOMER_LIST = 'customercare/modules/customer/GET_CUSTOMER_LIST';
const NEW_CUSTOMER = 'customercare/modules/customer/NEW_CUSTOMER';
const UPDATE_CUSTOMER = 'customercare/modules/customer/UPDATE_CUSTOMER';

// Reducer
export default function reducer(state = {status: {}}, action = {}) {
	switch (action.type) {
		case EventDispatcher.successAction(CLEAR_STATUS):
			const {status} = action.data;
			return {
				...state,
				status
			};
			break;
		case EventDispatcher.successAction(GET_CUSTOMER_LIST):
			const {list} = action.data;
			return {
				...state,
				list
			};
			break;
		case EventDispatcher.successAction(NEW_CUSTOMER):
		case EventDispatcher.successAction(UPDATE_CUSTOMER):
			return {
				...state,
				status: {
					saved: true
				}
			};
			break;
		default:
			return state;
	}
}

// Actions
export function clearStatus() {
	return dispatch => {
		EventDispatcher.success(dispatch, CLEAR_STATUS, {status: {}});
	};
}

export function getCustomerList() {

	return dispatch => {
		EventDispatcher.loading(dispatch, GET_CUSTOMER_LIST);
		const currentCustomer = Storage.getUser();
		const {seller} = currentCustomer;
		const searchParams = {
			seller
		};
		Opencell.CustomerService.search(searchParams).then(
			response => {
				const {actionStatus, customers={}} = response;
				if (actionStatus == null || actionStatus.status === "FAIL") {
					EventDispatcher.error(dispatch, GET_CUSTOMER_LIST, actionStatus);
				} else {
					const list = [];
					customers.customer = customers.customer || [];
					customers.customer.map(customer => {
						list.push(new Customer(customer));
					});
					EventDispatcher.success(dispatch, GET_CUSTOMER_LIST, {
						list
					});
				}
			},
			error => {
				const {response = {}} = error;
				if (response.status === 401) {
					dispatch(PageActions.errorAlert("Invalid username or password."));
				} else {
					EventDispatcher.error(dispatch, GET_CUSTOMER_LIST, error);
				}
			}).catch(error => {
			const err = new Error(error);
			dispatch(PageActions.errorAlert(err.message));
		});
	};
}

export function newCustomer(data) {
	return dispatch => {
		EventDispatcher.loading(dispatch, NEW_CUSTOMER);
		const client = new Client(data);
		const accountHierarchy = new AccountHierarchy(client);
		Opencell.AccountService.register(accountHierarchy).then(
			response => {
				if (response == null || response.status === "FAIL") {
					const error = new Error(response);
					dispatch(PageActions.errorAlert(error.message));
				} else {
					EventDispatcher.success(dispatch, NEW_CUSTOMER, {
						message: "Successfully created new customer account."
					});
				}
			}).catch(error => {
			const err = new Error(error);
			dispatch(PageActions.errorAlert(err.message));
		});

	};
}

export function updateCustomer(data) {
	return dispatch => {
		EventDispatcher.loading(dispatch, UPDATE_CUSTOMER);
		const client = new Client(data);
		const accountHierarchy = new AccountHierarchy(client);
		Opencell.AccountService.updateAccount(accountHierarchy).then(
			response => {
				if (response == null || response.status === "FAIL") {
					const error = new Error(response);
					dispatch(PageActions.errorAlert(error.message));
				} else {
					EventDispatcher.success(dispatch, UPDATE_CUSTOMER, {
						message: "Successfully updated customer account details."
					});
				}
			}).catch(error => {
			const err = new Error(error);
			dispatch(PageActions.errorAlert(err.message));
		});

	};
}