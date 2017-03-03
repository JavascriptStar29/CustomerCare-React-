import EventDispatcher from "framework/EventDispatcher";
import AccountHierarchy from "models/account/AccountHierarchy";
import Error from "models/Error";
import Client from "models/Client";
import Invoice from "models/invoicing/Invoice";
import * as Opencell from "api/Opencell";
import Storage from "api/Storage";
import * as PageActions from "modules/PageModule";


// Action Types
const GET_INVOICE_LIST = 'customercare/modules/invoice/GET_INVOICE_LIST';


// Reducer
export default function reducer(state = {status: {}}, action = {}) {
	switch (action.type) {
		case EventDispatcher.successAction(GET_INVOICE_LIST):
			const {list} = action.data;
			return {
				...state,
				list
			};
			break;
		default:
			return state;
	}
}



export function getInvoiceList() {

	return dispatch => {
		EventDispatcher.loading(dispatch, GET_INVOICE_LIST);
		const currentCustomer = Storage.getUser();
		let list = [];
		Opencell.InvoiceService.listPresentInAR(currentCustomer).then(
			response => {
				const {actionStatus} = response;
				if (actionStatus == null || actionStatus.status === "FAIL") {
					EventDispatcher.error(dispatch, GET_INVOICE_LIST, actionStatus);
				} else {
					const {CustomerInvoiceDtoList=[]}  = response;
					CustomerInvoiceDtoList.map( inv => {
						list.push(new Invoice(inv));
					});
					EventDispatcher.success(dispatch, GET_INVOICE_LIST, {
						list
					});
				}
			},
			error => {
				const {response = {}} = error;
				if (response.status === 401) {
					dispatch(PageActions.errorAlert("Invalid username or password."));
				} else {
					EventDispatcher.error(dispatch, GET_INVOICE_LIST, error);
				}
			}).catch(error => {
			const err = new Error(error);
			dispatch(PageActions.errorAlert(err.message));
		});
	};
}

