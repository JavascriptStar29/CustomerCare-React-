import EventDispatcher from 'framework/EventDispatcher';

import Service from 'models/catalog/Service';

import * as Opencell from 'api/Opencell';

// Action Types
const FETCH_INCOMPATIBLE_SERVICES = 'customercare/modules/services/FETCH_INCOMPATIBLE_SERVICES';
const SUBSCRIBE_SERVICE = 'customercare/modules/services/SUBSCRIBE_SERVICE';
const TERMINATE_SERVICE = 'customercare/modules/services/TERMINATE_SERVICE';
const TERMINATION_REASONS = 'customercare/modules/services/TERMINATION_REASONS';

// Reducer
export default function reducer(store = {}, action = {}) {
	switch (action.type) {
		case EventDispatcher.successAction(FETCH_INCOMPATIBLE_SERVICES):
		{
			return {
				...store,
				incompatibleServices: action.data.incompatibleServices
			};
			break;
		}
		case EventDispatcher.successAction(SUBSCRIBE_SERVICE):
		{
			const {subscription, service} = action.data;
			return {
				...store,
				subscription,
				service
			};
			break;
		}
		case EventDispatcher.successAction(TERMINATE_SERVICE):
		{
			const {subscription, serviceInstance} = action.data;
			return {
				...store,
				subscription,
				serviceInstance
			};
			break;
		}
		case EventDispatcher.successAction(TERMINATION_REASONS):
		{
			return {
				...store,
				terminationReasons: action.data
			};
			break;
		}
		default:
		{
			return store;
		}
	}
}

// Action Creators
export function subscribeService(subscription, service) {
	return dispatch => {
		EventDispatcher.loading(dispatch, SUBSCRIBE_SERVICE);
		const data = {
			subscription: subscription.code,
			servicesToActivate: {
				service: [
					{
						code: service.code,
						quantity: service.quantity,
						subscriptionDate: service.subscriptionDate
					}
				]
			}
		};
		Opencell.SubscriptionService.subscribeService(data).then(actionStatus => {
			if (actionStatus == null || actionStatus.status === "FAIL") {
				EventDispatcher.error(dispatch, SUBSCRIBE_SERVICE, actionStatus);
			} else {
				EventDispatcher.success(dispatch, SUBSCRIBE_SERVICE, {
					service,
					subscription,
					message: "Successfully subscribed to " + service.description + " option."
				});
			}
		}).catch(error => {
			EventDispatcher.error(dispatch, SUBSCRIBE_SERVICE, error);
		});
	};
}

export function terminateService(subscription, serviceInstance) {
	return dispatch => {
		EventDispatcher.loading(dispatch, TERMINATE_SERVICE);
		const data = {
			subscriptionCode: subscription.code,
			services: [
				serviceInstance.code
			],
			terminationReason: serviceInstance.terminationReason.code,
			terminationDate: serviceInstance.terminationDate
		};
		Opencell.SubscriptionService.terminateService(data).then(actionStatus => {
			if (actionStatus == null || actionStatus.status === "FAIL") {
				EventDispatcher.error(dispatch, TERMINATE_SERVICE, actionStatus);
			} else {
				EventDispatcher.success(dispatch, TERMINATE_SERVICE, {
					serviceInstance,
					subscription,
					message: "Successfully terminated " + serviceInstance.description + " option."
				});
			}
		}).catch(error => {
			EventDispatcher.error(dispatch, TERMINATE_SERVICE, error);
		});
	};
}

export function fetchIncompatibleServices(service) {
	return dispatch => {
		EventDispatcher.loading(dispatch, FETCH_INCOMPATIBLE_SERVICES);
		service = service || {};
		const {incompatibleServices} = service;

		const serviceDetailPromises = [];
		incompatibleServices.map(incompatibleService => {
			serviceDetailPromises.push(Opencell.ServiceDetailsService.find(incompatibleService.code));
		});
		Promise.all(serviceDetailPromises).then(serviceDtoList => {
			serviceDtoList = serviceDtoList || [];
			const incompatibleServices = [];
			serviceDtoList.map(serviceDto => {
				const {actionStatus} = serviceDto;
				if (actionStatus == null || actionStatus.status === "FAIL") {
					EventDispatcher.fail(dispatch, FETCH_INCOMPATIBLE_SERVICES, actionStatus);
				} else {
					incompatibleServices.push(new Service(serviceDto.serviceTemplate));
				}
			});
			EventDispatcher.success(dispatch, FETCH_INCOMPATIBLE_SERVICES,
				Object.assign({}, service, {
					incompatibleServices: incompatibleServices
				})
			);
		}).catch(error => {
			EventDispatcher.error(dispatch, FETCH_INCOMPATIBLE_SERVICES, error);
		});
	};
}

export function listTerminationReasons() {
	return dispatch => {
		EventDispatcher.loading(dispatch, TERMINATION_REASONS);
		Opencell.TerminationReasonService.listTerminationReasons().then(response => {
			const {actionStatus, terminationReason} = response || {};
			if (actionStatus == null || actionStatus.status === "FAIL") {
				EventDispatcher.error(dispatch, TERMINATION_REASONS, actionStatus);
			} else {
				EventDispatcher.success(dispatch, TERMINATION_REASONS, terminationReason);
			}
		}).catch(error => {
			EventDispatcher.error(dispatch, TERMINATION_REASONS, error);
		});
	};
}