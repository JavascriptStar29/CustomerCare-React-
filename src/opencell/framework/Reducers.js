import { combineReducers } from "redux"

import customer from 'modules/CustomerModule';
import page from 'modules/PageModule';
import service from 'modules/ServicesModule';
import subscription from 'modules/SubscriptionsModule';
import user from 'modules/UserModule';
import invoice from 'modules/InvoiceModule';

export default combineReducers({
	customer,
	invoice,
	page,
	service,
	subscription,
	user
})
