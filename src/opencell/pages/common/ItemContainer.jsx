import React from 'react';

export default class ItemContainer extends React.Component {
	render() {
		const { triggerText, triggerTextWhenOpen, ...otherProps } = this.props;
		
		return (
			<div {...otherProps}>
				{this.props.children}
			</div>
		);
	}
}