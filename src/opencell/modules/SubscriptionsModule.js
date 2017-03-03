import EventDispatcher from "framework/EventDispatcher";
import * as Opencell from "api/Opencell";
import Storage from 'api/Storage'
import Offer from "models/catalog/Offer";
import Subscription from "models/catalog/Subscription";

// Action Types
const FETCH_SUBSCRIPTION_BY_CODE = 'customercare/modules/subscriptions/FETCH_CUSTOMER_SUBSCRIPTIONS_BY_CODE';
const FETCH_CUSTOMER_SUBSCRIPTIONS = 'customercare/modules/subscriptions/FETCH_CUSTOMER_SUBSCRIPTIONS';
const FETCH_SUBSCRIPTIONS = 'customercare/modules/subscriptions/FETCH_SUBSCRIPTIONS';

// Reducer
export default function reducer(store = {}, action = {}) {
	switch (action.type) {
		case EventDispatcher.successAction(FETCH_SUBSCRIPTION_BY_CODE):
			return {
				...store,
				chosen: action.data
			};
			break;
		case EventDispatcher.successAction(FETCH_CUSTOMER_SUBSCRIPTIONS):
			return {
				...store,
				list: action.data
			};
			break;
		case EventDispatcher.successAction(FETCH_SUBSCRIPTIONS):
			return {
				...store,
				list: action.data
			};
			break;
		default:
			return store;
	}
}

// Actions
export function fetchSubscriptions() {
	return dispatch => {
        EventDispatcher.loading(dispatch, FETCH_SUBSCRIPTIONS);
        const currentCustomer = Storage.getUser();
        if (currentCustomer == null) {
            EventDispatcher.error(dispatch, FETCH_SUBSCRIPTIONS, {
                message: "Customer is not logged in."
			});
		}
		const {customerAccount: {billingAccount: {userAccount}}} = currentCustomer;
		let subscriptionsList = [];
		Opencell.SubscriptionService.listByUserAccount(userAccount).then(subscriptionDto => {
			const {actionStatus} = subscriptionDto;
			if (actionStatus == null || actionStatus.status === "FAIL") {
				EventDispatcher.error(dispatch, FETCH_SUBSCRIPTIONS, actionStatus);
			} else {
				const {subscriptions} = subscriptionDto;
				let {subscription} = subscriptions || {};
				subscription = subscription || [];

				subscription.map(sub => {
					subscriptionsList.push(new Subscription(sub));
				});

				const offerPromises = [];
				subscriptionsList.map(sub => offerPromises.push(Opencell.OfferService.find(sub.offerTemplate)));

				return Promise.all(offerPromises);
			}
		}).then(offers => {
			offers = offers || [];
			offers.every((offerDto, index) => {
				const {actionStatus} = offerDto;
				if (actionStatus == null || actionStatus.status === "FAIL") {
					EventDispatcher.error(dispatch, FETCH_SUBSCRIPTIONS, actionStatus);
					return false;
				} else {
					const subscription = subscriptionsList[index];
					subscription.offerTemplate = new Offer(offerDto);
					return true;
				}
			});
			EventDispatcher.success(dispatch, FETCH_SUBSCRIPTIONS, subscriptionsList);
		}).catch(error => {
			EventDispatcher.error(dispatch, FETCH_SUBSCRIPTIONS, error);
		});
	};
}

export function fetchCustomerSubscriptions(customer) {
	return dispatch => {
		EventDispatcher.loading(dispatch, FETCH_CUSTOMER_SUBSCRIPTIONS);
		if (customer == null) {
			EventDispatcher.error(dispatch, FETCH_CUSTOMER_SUBSCRIPTIONS, {
				message: "Customer must be specified."
			});
		}
		const {customerAccount: {billingAccount: {userAccount}}} = customer;
		let subscriptionsList = [];
		Opencell.SubscriptionService.listByUserAccount(userAccount).then(subscriptionDto => {
			const {actionStatus} = subscriptionDto;
			if (actionStatus == null || actionStatus.status === "FAIL") {
				EventDispatcher.error(dispatch, FETCH_CUSTOMER_SUBSCRIPTIONS, actionStatus);
			} else {
				const {subscriptions} = subscriptionDto;
				let {subscription} = subscriptions || {};
				subscription = subscription || [];

				subscription.map(sub => {
					subscriptionsList.push(new Subscription(sub));
				});

				const offerPromises = [];
				subscriptionsList.map(sub => offerPromises.push(Opencell.OfferService.find(sub.offerTemplate)));

				return Promise.all(offerPromises);
			}
		}).then(offers => {
			offers = offers || [];
			offers.every((offerDto, index) => {
				const {actionStatus} = offerDto;
				if (actionStatus == null || actionStatus.status === "FAIL") {
					EventDispatcher.error(dispatch, FETCH_CUSTOMER_SUBSCRIPTIONS, actionStatus);
					return false;
				} else {
					const subscription = subscriptionsList[index];
					subscription.offerTemplate = new Offer(offerDto);
					return true;
				}
			});
			EventDispatcher.success(dispatch, FETCH_CUSTOMER_SUBSCRIPTIONS, subscriptionsList);
		}).catch(error => {
			EventDispatcher.error(dispatch, FETCH_CUSTOMER_SUBSCRIPTIONS, error);
		});
	};
}

export function fetchSubscriptionByCode(subscriptionCode) {
	return dispatch => {

		EventDispatcher.loading(dispatch, FETCH_SUBSCRIPTION_BY_CODE);

		let subscription = null;
		Opencell.SubscriptionService.findSubscription(subscriptionCode).then(resultDto => {

			const {actionStatus} = resultDto;
			if (actionStatus == null || actionStatus.status === "FAIL") {
				EventDispatcher.error(dispatch, FETCH_SUBSCRIPTION_BY_CODE, actionStatus);
			} else {
				subscription = new Subscription(resultDto.subscription);
				return Opencell.OfferService.find(subscription.offerTemplate);
			}

		}).then(offer => {

			const {actionStatus} = offer;
			if (actionStatus == null || actionStatus.status === "FAIL") {
				EventDispatcher.error(dispatch, FETCH_SUBSCRIPTION_BY_CODE, actionStatus);
			} else {
				subscription.offerTemplate = new Offer(offer);
				EventDispatcher.success(dispatch, FETCH_SUBSCRIPTION_BY_CODE, subscription);
			}

		}).catch(error => {
			EventDispatcher.error(dispatch, FETCH_SUBSCRIPTION_BY_CODE, error);
		});
	};
}