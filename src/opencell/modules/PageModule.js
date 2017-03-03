// Action Types
export const ALERT_ERROR = 'customercare/modules/pages/ALERT_ERROR';
export const ALERT_INFO = 'customercare/modules/pages/ALERT_INFO';
export const ALERT_WARNING = 'customercare/modules/pages/ALERT_WARNING';
export const CLEAR_ALERTS = 'customercare/modules/pages/CLEAR_ALERTS';
export const CLEAR_ERRORS = 'customercare/modules/pages/CLEAR_ERRORS';

// Reducer
export default function reducer(state = {}, action = {}) {
	const hasMessage = action.data && action.data.message && action.data.message.trim() !== '';
	const hasError = action.data && action.data.error;
	if (action.type.endsWith('_LOADING')) {
		return {
			...state,
			alert: null,
			isLoading: true,
			error: null
		};
	} else if (action.type.endsWith('_FULFILLED')) {
		const newState = {
			...state,
			isLoading: false,
			error: null
		};

		let alert = null;
		if (hasMessage) {
			alert = {
				alertClass: 'alert alert-success',
				message: action.data.message
			};
		}
		if (!!alert) {
			newState.alert = alert;
		}
		return newState;

	} else if (action.type.endsWith('_REJECTED') && hasError) {
		return {
			...state,
			alert: null,
			isLoading: false,
			error: action.data.error
		};
	}
	switch (action.type) {
		case ALERT_ERROR:
			return {
				...state,
				alert: {
					alertClass: 'alert alert-danger',
					message: action.data
				},
				isLoading: false,
				error: null
			};
			break;
		case ALERT_INFO:
			return {
				...state,
				alert: {
					alertClass: 'alert alert-info',
					message: action.data
				},
				isLoading: false,
				error: null
			};
			break;
		case ALERT_WARNING:
			return {
				...state,
				alert: {
					alertClass: 'alert alert-warning',
					message: action.data
				},
				isLoading: false,
				error: null
			};
			break;
		case CLEAR_ALERTS:
			return {
				...state,
				alert: null
			};
			break;
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
			break;
		default:
			return state;
	}
}

// Action Creators
export function errorAlert(message) {
	return dispatch => {
		dispatch({
			type: ALERT_ERROR,
			data: message
		});
	}
}

export function infoAlert(message) {
	return dispatch => {
		dispatch({
			type: ALERT_INFO,
			data: message
		});
	}
}

export function warningAlert(message) {
	return dispatch => {
		dispatch({
			type: ALERT_WARNING,
			data: message
		});
	}
}

export function clearAlerts() {
	return dispatch => {
		dispatch({
			type: CLEAR_ALERTS
		});
	}
}

export function clearErrors() {
	return dispatch => {
		dispatch({
			type: CLEAR_ERRORS
		});
	}
}