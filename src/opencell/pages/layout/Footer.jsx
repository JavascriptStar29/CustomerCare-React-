import React from "react";
import * as properties from "opencell/properties";

export default class Footer extends React.Component {
	render() {
		return (
			<footer class="text-center footer">
				<div class="row">
					<div class="footer-links col-xs-12">
						<ul class="list-inline">
							<li><a href="https://opencellsoft.com/about/" target="_blank">About Opencell</a></li>
							<li><a href="https://app.assembla.com/spaces/meveo/messages" target="_blank">Community</a></li>
							<li><a href="https://opencellsoft.com/privacy/" target="_blank">Privacy</a></li>
							<li><a href="https://opencellsoft.com/contact_us/" target="_blank">Contact us</a></li>
						</ul>
					</div>
				</div>
				<div class="row">
					<div class="footer-icons col-xs-12">
						<ul class="list-inline">
							<li><a href="https://www.youtube.com/c/Opencellsoftwares/videos" target="_blank"><i class="fa fa-youtube"/></a></li>
							<li><a href="https://www.facebook.com/opencellsoftware" target="_blank"><i class="fa fa-facebook"/></a></li>
							<li><a href="https://twitter.com/opencellsoft" target="_blank"><i class="fa fa-twitter"/></a></li>
							<li><a href="https://www.linkedin.com/company/opencell" target="_blank"><i class="fa fa-linkedin"/></a></li>
							<li>
								<div class="footer-copyright">
									<i class="fa fa-copyright"/> Opencell Customer Care
								</div>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		);
	}
}
