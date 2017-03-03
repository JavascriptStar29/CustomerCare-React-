import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Alert from "common/Alert.jsx";
import PageLoader from "common/PageLoader.jsx";
import ErrorDetails from "common/ErrorDetails.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import * as PageActions from "modules/PageModule";
import * as properties from "opencell/properties";

@withRouter
@connect((store) => {
	return {
		isLoading: store.page.isLoading,
		alert: store.page.alert,
		error: store.page.error,
		currentUser: store.user.user
	};
})
export default class Main extends React.Component {

	shouldComponentUpdate(nextProps) {
		const currentPage = this.props.location.pathname;
		const nextPage = nextProps.location.pathname;
		const isSamePage = currentPage === nextPage;
		const currentHasError = !!this.props.error;
		const loggedIn = !!nextProps.currentUser;
		const isSecuredPage = nextPage.indexOf(properties.secured) > -1;
		const fromLoginPage = currentPage === properties.root
			|| nextPage.indexOf(properties.index) > -1
			|| nextPage.indexOf(properties.sign_in.path) > -1;

		if (!isSamePage && currentHasError) {
			this.props.dispatch(PageActions.clearErrors());
		}

		if(!loggedIn && !fromLoginPage && isSecuredPage){
			this.props.router.push(properties.root);
			return false;
		}
		return true;
	}

	clearAlerts() {
		this.props.dispatch(PageActions.clearAlerts());
	}

	render() {
		const url = this.props.location.pathname;
		const {error, isLoading} = this.props;
		return (
			<div id="main">
				<Header url={url} {...this.props} />
				<div class="app-content container-fluid">
					<PageLoader {...this.props} />
					<ErrorDetails {...this.props} />
					<Alert clearAlerts={this.clearAlerts.bind(this)} {...this.props} />
					{!!error ? null : this.props.children}
				</div>
				<Footer url={url} {...this.props} />
			</div>
		);
	}
}
