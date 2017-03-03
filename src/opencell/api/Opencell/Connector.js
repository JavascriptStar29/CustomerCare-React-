import fetch from "isomorphic-fetch";

export default class Connector {

	constructor(host, credentials, provider) {
		this.host = host;
		this.provider = provider;

		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
		this.headers.append('Accept', 'application/json');
		this.headers.append('Access-Control-Allow-Origin', '*');
		this.headers.append('Access-Control-Allow-Credentials', true);
		this.headers.append('Access-Control-Allow-Methods', 'DELETE, GET, OPTIONS, POST, PUT');
		this.headers.append('Access-Control-Allow-Headers', 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token');
		this.headers.append('Access-Control-Max-Age', '1000');
		this.headers.append('Authorization', 'Basic ' + credentials);

		this.requestOptions = {
			method: 'GET',
			headers: this.headers,
			mode: 'cors',
			cache: 'no-cache'
		};
	}

	invokeRequest({url, payload, method}) {
		this.requestOptions.body = JSON.stringify(payload);
		return this.callApi({url, method});
	}

	callApi({url="/", method="GET"}) {
		this.requestOptions.method = method;
		const fullUrl = this.host + url;
		return new Promise((resolve, reject) => {
			fetch(fullUrl, this.requestOptions)
				.then(checkStatus)
				.then(parseJson)
				.then(data => {
					resolve(data);
				})
				.catch(error => {
					reject(error);
				})
		});
	}
}

function parseJson(data) {
	if (!!data) {
		return data.text().then((text = {}) => {
			return !!text && JSON.parse(text);
		});
	}
	return null;
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		const error = new Error(response.statusText);
		error.response = response;
		throw error
	}
}
