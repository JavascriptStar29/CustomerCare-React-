import React from 'react';

export default class Spinner extends React.Component {
	render() {
		if (this.props.isLoading) {
			return <i class="fa fa-spinner" />;
		}
		return null;
	}
}