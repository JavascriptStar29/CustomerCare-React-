import React from "react";

export default class PageLoader extends React.Component {
	render() {
		const {isLoading} = this.props;
		if (isLoading) {
			return (
				<div class="loader-container container">
					<div class="row">
						<div class="col-xs-5 vertical-middle">
							<img src="./images/page_loading.gif"/>
						</div>
						<div class="col-xs-7 vertical-middle">
							<h3>Loading page...</h3>
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}