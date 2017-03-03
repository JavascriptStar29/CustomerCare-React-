import BaseService from '../BaseService';

class SellerService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/seller";
	}


	find() {
		const url = this.serviceUrl + "/list";
		return this.connector.callApi({url});
	}

}

const sellerService = new SellerService();
export default sellerService;