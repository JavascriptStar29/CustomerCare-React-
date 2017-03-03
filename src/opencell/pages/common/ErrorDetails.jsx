import React from 'react';

export default class ErrorDetails extends React.Component {

	componentDidMount(){
		window.scrollTo(0, 0);
	}

	componentDidUpdate(){
		window.scrollTo(0, 0);
	}

	render() {
		const {error} = this.props;
		if (error) {
			return (
				<div class="page-content col-sm-offset-2 col-lg-offset-3 col-sm-8 col-lg-6">
					<div class="well">
						<div class="row">
							<div class="col-md-2 col-sm-3 col-xs-4">
								<i class="fa fa-warning fa-4x"/>
							</div>
							<div class="col-md-10 col-sm-9 col-xs-8">
								<div class="short-div">{error.code}</div>
								<div class="short-div">{error.message}</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}