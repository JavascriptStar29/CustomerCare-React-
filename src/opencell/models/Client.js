export default class Client {

	constructor(clientDetails) {
		this.account_type = "Client";
		this.userName = clientDetails.userName;
		this.email = clientDetails.email;
		this.password = clientDetails.password;
		this.firstName = clientDetails.firstName;
		this.lastName = clientDetails.lastName;

		this.mobile = clientDetails.mobile;

		this.mobile = clientDetails.mobile;
		this.address1 = clientDetails.address1;
		this.address2 = clientDetails.address2;
		this.address3 = clientDetails.address3;
		this.zipCode = clientDetails.zipCode;
		this.city = clientDetails.city;
		this.country = clientDetails.country;
		this['state'] = clientDetails['state'];

		this.paymentMethod = clientDetails.paymentMethod;
		this.country =  clientDetails.country;
		this.mandateIdentification = clientDetails.mandateIdentification;
		this.mandateDate = clientDetails.mandateDate;
		this.electronicBilling = clientDetails.electronicBilling;

	}

}
