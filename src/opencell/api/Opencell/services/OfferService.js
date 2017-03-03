import BaseService from '../BaseService';

class OfferService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/catalog/offerTemplate";
	}


	find(code) {
		const url = this.serviceUrl + '?offerTemplateCode=' + code;
		return this.connector.callApi({url});
	}

}

const offerService = new OfferService();
export default offerService;