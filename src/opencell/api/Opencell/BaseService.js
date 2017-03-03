import Connector from './Connector';
import Storage from 'api/Storage';

import * as properties from 'opencell/properties';

export default class BaseService {
	constructor(provider) {
		this.provider = provider || properties.provider;
	}

	get connector() {
		return new Connector(properties.meveo_path, Storage.getUserCredentials(), this.provider);
	}

	get apiConnector() {
		return new Connector(properties.meveo_path, Storage.getApiCredentials(), this.provider);
	}

}
