import Error from 'models/Error';

export default class EventDispatcher {

	static successAction(type) {
		return type + "_FULFILLED";
	}

	static loading(dispatch, type) {
		dispatch({type: type + "_LOADING"});
	}

	static success(dispatch, type, data) {
		dispatch({type: type + "_FULFILLED", data: data});
	}

	static error(dispatch, type, data) {
		dispatch({
			type: type + "_REJECTED", data: {
				error: new Error(data)
			}
		});
	}
}

