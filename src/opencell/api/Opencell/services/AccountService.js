import BaseService from "../BaseService";

class AccountService extends BaseService {

	createCustomEntity(entity) {
		return this.connector.invokeRequest({
			url: "/api/rest/customEntityInstance/",
			method: "POST",
			payload: entity
		});
	}

	register(entity) {
		return this.apiConnector.invokeRequest({
			url: "/inbound/DEMO/registration",
			method: "POST",
			payload: entity
		});
	}

	updateAccount(entity) {
		return this.connector.invokeRequest({
			url: "/api/rest/account/accountHierarchy/updateCRMAccountHierarchy",
			method: "POST",
			payload: entity
		});
	}

	createOrUpdate(entity) {
		return this.connector.invokeRequest({
			url: "/api/rest/user/createOrUpdate",
			method: "POST",
			payload: entity
		});
	}

	findUser(customerCode) {
		return this.connector.invokeRequest({
			url: "/api/rest/account/accountHierarchy/find",
			method: "POST",
			payload: {customerCode}
		});
	}

	contact(data, callback) {
		return this.connector.invokeRequest({
			url: "/api/rest/account/contact/",
			method: "POST",
			payload: data
		});
	}
}
const accountService = new AccountService();
export default accountService;