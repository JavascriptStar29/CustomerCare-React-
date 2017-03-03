import React from "react";
import * as properties from 'opencell/properties';

export default class About extends React.Component {
	render() {
		return (
			<div class="container page-content">
				<div class="row">
					<div class="col-md-12">
						<h1>Welcome to the About Page</h1>
						<h2>Opencell Customer Care v{properties.version}</h2>
					</div>
				</div>
			</div>

		);
	}
}
