export default class AccountHierarchy {
	constructor(client) {
		this.crmAccountType = client.accountType || "Client";
		this.crmParentCode = client.parentCode || 'SELLER_FR';
		this.code = client.userName;
		this.description = client.description || client.firstName + " " + client.lastName + "'s Customer Care account.";
		this.name = {
			"title": client.title || "M",
			"firstName": client.firstName,
			"lastName": client.lastName
		};
		this.address = {
			"address1": client.address1 || "",
			"address2": client.address2 || "",
			"address3": '',
			"zipCode": client.zipCode || "",
			"city": client.city || "",
			"country": client.country || "",
			"state": client.state || ""
		};
		this.contactInformation = {
			"email": client.email,
			"phone": client.mobile,
			"mobile": client.mobile
		};
		this.paymentMethod = client.paymentMethod || "CHECK";
		this.language = client.language || 'FRA';
		this.customerCategory = client.accountType || "Client";
		this.currency = client.currency ||'EUR';
		this.caStatus = client.caStatus ||'ACTIVE';
		this.billingCycle = client.billingCycle || 'CYC_INV_MT_1';
		this.country = client.country || "FR";
		this.baStatus = client.baStatus ||'ACTIVE';
		this.email = client.billingEmail || '';
		this.uaStatus = client.uaStatus || 'ACTIVE';
		this.mandateIdentification = client.mandateIdentification || '';
		this.mandateDate = client.mandateDate || 0;
		this.electronicBilling = client.electronicBilling || false;
		this.bankCoordinates = {
			"bankCode": client.bankCode || '',
			"branchCode": client.branchCode || '',
			"accountNumber": client.accountNumber || '',
			"key": client.key || '',
			"iban": client.iban || '',
			"bic": client.bic || '',
			"accountOwner": client.accountOwner || '',
			"bankName": client.bankName || '',
			"bankId": client.bankId || '',
			"issuerNumber": client.issuerNumber || '',
			"issuerName": client.issuerName || '',
			"ics": client.ics || ''
		};

		this.customFields = {
			"customField": [
				{
					"code": "password",
					"stringValue": client.password
				}
			]
		};
	}

}
