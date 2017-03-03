import Service from "./Service";
import * as properties from "opencell/properties";

export default class Offer {
	constructor(dto) {
		dto = dto || {};
		const {offerTemplate = {}} = dto;

		this.code = offerTemplate.code;
		this.description = offerTemplate.description;
		this.name = offerTemplate.name;
		this.longDescription = offerTemplate.longDescription;
		this.disabled = offerTemplate.disabled;
		this.bomCode = offerTemplate.bomCode;
		this.offerTemplateCategoryCode = offerTemplate.offerTemplateCategoryCode;
		this.image = properties.meveo_path + "/picture/" + properties.provider + "/offer/" + offerTemplate.code;
		this.termsAndConditions = offerTemplate.termsAndConditions || "./assets/Opencell_terms_and_conditions.pdf";

		let {offerServiceTemplates} = offerTemplate || {};
		offerServiceTemplates = offerServiceTemplates || [];
		this.offerServices = [];
		offerServiceTemplates.map(offerServiceTemplate => {
			offerServiceTemplate = offerServiceTemplate || {};
			this.offerServices.push(
				new Service(offerServiceTemplate.serviceTemplate,
					offerServiceTemplate.mandatory,
					offerServiceTemplate.incompatibleServices));
		});
	}
}