import BaseService from '../BaseService';

class InvoiceService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/invoice";
	}
	
	listPresentInAR(customerAccount) {
		let url = this.serviceUrl + '/listPresentInAR?customerAccountCode=' + customerAccount.code;
		return this.connector.callApi({url});
	}

	listByCustomerAccount(customerAccount) {
		const url = this.serviceUrl + '/listInvoiceByCustomerAccount?customerAccountCode=' + customerAccount.code;
		return this.connector.callApi({url});
	}

}

const invoiceService = new InvoiceService();
export default invoiceService;