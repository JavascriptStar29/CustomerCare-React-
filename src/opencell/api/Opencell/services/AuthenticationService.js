import BaseService from "../BaseService";
import Storage from "api/Storage";

class AuthenticationService extends BaseService {

	login(credentials) {
		Storage.setUserCredentials(credentials);
		return this.connector.invokeRequest({
			url: "/api/rest/account/accountHierarchy/find",
			method: "POST",
			payload: {
				customerCode: credentials.username
			}
		});
	}

	forgotPassword(email) {
		return this.apiConnector.invokeRequest({
			url: "/inbound/DEMO/forgotPassword",
			method: "POST",
			payload: {email}
		});
	}

	resetPassword(password) {
		this.connector.invokeRequest({
			url: "/api/rest/account/resetPassword/",
			method: "POST",
			payload: {password}
		});
	}
}
const authenticationService = new AuthenticationService();
export default authenticationService;