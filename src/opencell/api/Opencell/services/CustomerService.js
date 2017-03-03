import BaseService from "../BaseService";

class CustomerService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/account/customer";
	}


	search(searchFields) {
		const url = this.serviceUrl + "/list";
		return this.connector.invokeRequest({
			url,
			payload: searchFields,
			method: 'POST'
		});
	}
}
const customerService = new CustomerService();
export default customerService;