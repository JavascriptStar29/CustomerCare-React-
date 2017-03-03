import EventDispatcher from "framework/EventDispatcher";
import Error from "models/Error";
import Customer from "models/account/Customer";
import * as Opencell from "api/Opencell";
import Storage from "api/Storage";
import * as PageActions from "modules/PageModule";


// Action Types
const FORGOT_PASSWORD = 'customercare/modules/user/FORGOT_PASSWORD';
const LOGIN = 'customercare/modules/user/LOGIN';
const LOGOUT = 'customercare/modules/user/LOGOUT';

// Reducer
export default function reducer(state = {user: Storage.getUser()}, action = {}) {
	switch (action.type) {
		case EventDispatcher.successAction(LOGIN):
			const {user} = action.data;
			return {
				...state,
				user
			};
			break;
		case EventDispatcher.successAction(LOGOUT):
			return {
				...state,
				user: null
			};
			break;
		default:
			return state;
	}
}

// Actions
export function login(credentials) {
	return dispatch => {
		EventDispatcher.loading(dispatch, LOGIN);
		Opencell.AuthenticationService.login(credentials).then(
			response => {
				const {actionStatus, customers} = response;
				const {customer} = customers || {};
				const [ firstCustomer ] = customer || [];
				if (actionStatus == null || actionStatus.status === "FAIL") {
					EventDispatcher.error(dispatch, LOGIN, actionStatus);
				} else if (firstCustomer == null) {
					dispatch({type: PageActions.ALERT_ERROR, data: {message: "No customer found."}});
				} else {
					const customer = new Customer(firstCustomer);
					Storage.setUser(customer, credentials);
					EventDispatcher.success(dispatch, LOGIN, {
						user: customer,
						message: "You are now logged in."
					});
				}
			},
			error => {
				const {response = {}} = error;
				if (response.status === 401) {
					dispatch(PageActions.errorAlert("Invalid username or password."));
				} else {
					EventDispatcher.error(dispatch, LOGIN, error);
				}
			}).catch(error => {
			const err = new Error(error);
			dispatch(PageActions.errorAlert(err.message));
		});
	};
}

export function forgotPassword(emailAddress) {
	return dispatch => {
		EventDispatcher.loading(dispatch, FORGOT_PASSWORD);
		Opencell.AuthenticationService.forgotPassword(emailAddress).then(() => {
			EventDispatcher.success(dispatch, FORGOT_PASSWORD, {
				message: "Successfully sent password reset email."
			});
		}).catch(error => {
			const err = new Error(error);
			dispatch(PageActions.errorAlert(err.message));
		});
	};
}

export function logout() {
	return dispatch => {
		EventDispatcher.loading(dispatch, LOGOUT);
		const user = Storage.getUser();
		if (user == null) {
			EventDispatcher.error(dispatch, LOGOUT, {
				message: "No customer found."
			});
		}
		Storage.removeUser();
		EventDispatcher.success(dispatch, LOGOUT, {
			message: "Successfully logged out."
		});
	};
}