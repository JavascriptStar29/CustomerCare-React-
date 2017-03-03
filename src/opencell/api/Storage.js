import Store from "store";
import ApplicationError from "framework/ApplicationError";
import * as properties from "opencell/properties";

class Storage {
	constructor() {
		if (!Store.enabled) {
			throw new ApplicationError('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
		}

		Store.set("apiCredentials", btoa(properties.api_user.username + ":" + properties.api_user.password));
	}

	get(key, defaultValue) {
		return Store.get(key, defaultValue);
	}

	set(key, value) {
		Store.set(key, value);
	}

	remove(key) {
		Store.remove(key);
	}

	getUser() {
		return this.get("user");
	}

	setUser(user, credentials) {
		this.set("user", user);
		this.setUserCredentials(credentials);
	}

	getUserCredentials() {
		return this.get("userCredentials");
	}

	setUserCredentials(credentials) {
		this.set("userCredentials", btoa(credentials.username + ":" + credentials.password));
	}

	getApiCredentials() {
		return this.get("apiCredentials");
	}

	removeUser() {
		this.remove("user");
		this.remove("userCredentials");
	}
}

const storage = new Storage();

export default storage;