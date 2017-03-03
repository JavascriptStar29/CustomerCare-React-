import BaseService from '../BaseService';

class SubscriptionService extends BaseService {

	constructor() {
		super();
		this.serviceUrl = "/api/rest/billing/subscription";
	}

	findSubscription(subscriptionCode) {
		const url = this.serviceUrl + '?subscriptionCode=' + subscriptionCode;
		return this.connector.callApi({url});
	}

	listByUserAccount(userAccount) {
		const url = this.serviceUrl + '/list?userAccountCode=' + userAccount.code;
		return this.connector.callApi({url});
	}

	subscribeService(service) {
		const url = this.serviceUrl + '/activateServices';
		return this.connector.invokeRequest({
			url,
			method: "POST",
			payload: service
		});
	}

	terminateService(serviceInstance) {
		const url = this.serviceUrl + '/terminateServices';
		return this.connector.invokeRequest({
			url,
			method: "POST",
			payload: serviceInstance
		});
	}

}

const subscriptionService = new SubscriptionService();
export default subscriptionService;