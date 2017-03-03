import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router";
import DropdownMenu from "common/DropdownMenu.jsx";
import * as UserActions from "modules/UserModule";
import * as properties from "opencell/properties";

@withRouter
@connect((store) => {
	return {
		currentUser: store.user.user,
		isLoggedIn: !!store.user.user
	};
})
export default class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			searchTerm: null,
			mobileMenu: "none"
		};
		this.closeMenu = this.closeMenu.bind(this);
	}

	componentDidMount() {
		window.addEventListener("click", this.closeMenu);
	}

	componentWillUnmount() {
		window.removeEventListener("click", this.closeMenu);
	}

	componentDidUpdate(preProps, prevState){
		const menu = document.getElementById("second-level-menu");
		const alert = document.getElementById("alert");
		if(!!alert){
			alert.style.top = !!menu && menu.offsetHeight > 0 ? "120px" : "59px";
		}
	}

	updateSearchTerm(event) {
		const searchTerm = event.target.value;
		this.setState({
			searchTerm: searchTerm
		});
	}

	logout() {
		event.preventDefault();
		this.props.dispatch(UserActions.logout());
	}

	search(event) {
		event.preventDefault();
		const {searchTerm} = this.state;
		if (!!searchTerm && searchTerm.trim() !== '') {
			//TODO do search
		}
	}

	clickedOutsideOf(event, ids = []) {
		const clicked = ids.every(id=> {
			return event.target.id !== id
				&& event.target.parentNode.id !== id
				&& event.target.parentNode.parentNode.id !== id;
		});
		return clicked;
	}

	toggleMenu() {
		const {mobileMenu} = this.state;
		const alert = document.getElementById("alert");
		this.setState({
			mobileMenu: (mobileMenu === "none" ? "block" : "none")
		});
	}

	closeMenu(event) {
		const {mobileMenu} = this.state;
		if (mobileMenu === "block" && this.clickedOutsideOf(event, [
				"mobile-menu",
				"settings-menu",
				"header-settings",
				"header-help",
				"header-search"
			])) {
			this.setState({
				mobileMenu: (mobileMenu === "none" ? "block" : "none")
			});
		}
	}

	render() {
		const {currentUser, isLoggedIn} = this.props;
		return (
			<nav id="header-navbar" class="navbar navbar-default navbar-fixed-top" role="navigation">
				<div class="navbar-wrapper">
					<div class="navbar-header">
						<div>
							{isLoggedIn ?
								<Link to={properties.home.path} class="navbar-brand">
									<img src="images/logo.png" class="logo img-responsive"/>
								</Link>
								:
								<Link to={properties.root} class="navbar-brand">
									<img src="images/logo.png" class="logo img-responsive"/>
								</Link>
							}
							<button id="mobile-menu" type="button" class="navbar-toggle" onClick={this.toggleMenu.bind(this)}>
								<span class="sr-only">Menu</span>
								<span class="icon-bar"/>
								<span class="icon-bar"/>
								<span class="icon-bar"/>
							</button>
						</div>
					</div>

					<div id="right-menu" class="collapse navbar-collapse" style={{display: this.state.mobileMenu}}>
						<ul class="nav navbar-nav navbar-right">
							{isLoggedIn ?
								<li>
									<form class="navbar-form" role="search" onSubmit={this.search.bind(this)}>
										<div class="form-group">
											<input id="header-search" type="text" class="form-control" placeholder="Search" onChange={this.updateSearchTerm.bind(this)}/>
										</div>
										<button type="submit" class="sr-only">Submit</button>
									</form>
								</li> : null
							}
							{isLoggedIn ?
								<li>
									<div class="navbar-text navbar-text-sm">
										<h4 class="row">{currentUser.name.firstName}{' '}{currentUser.name.lastName}</h4>
										<h6 class="row">DEMO</h6>
									</div>
								</li> : null
							}
							{isLoggedIn ?
								<DropdownMenu id="header-settings" icon="fa-cog" label="Options">
									<ul class="dropdown-menu">
										<li>
											<Link to={properties.reset_password.path}>Change password</Link>
										</li>
										<li><a onClick={this.logout.bind(this)}>Log out</a></li>
									</ul>
								</DropdownMenu> : null
							}
							{!isLoggedIn ?
								<li>
									<Link to={properties.home.path}>
										<i class="fa fa-user fa-2x hidden-xs"/>
										<i class="fa fa-user visible-xs-inline"/>
										<span class="visible-xs-inline"> Login</span>
									</Link>
								</li> : null
							}
							<DropdownMenu id="header-help" icon="fa-question" label="Help">
								<ul class="dropdown-menu">
									<li>
										<Link to={properties.about.path}>About Customer Care</Link>
									</li>
									<li>
										<a href="https://app.assembla.com/spaces/meveo/wiki" target="_blank">Wiki</a>
									</li>
								</ul>
							</DropdownMenu>
						</ul>
					</div>
				</div>
				{isLoggedIn ?
					<div id="second-level-menu" class="collapse navbar-collapse navbar-second-level" style={{display: this.state.mobileMenu}}>
						<ul class="nav navbar-nav navbar-left">
							<li>
								<Link id="home" to={properties.home.path}>
									<i class="fa fa-home fa-3x hidden-xs"/>
									<span class="visible-xs-inline">Home</span>
								</Link>
							</li>
							<li><Link to={properties.validation_workflow.path}>Orders</Link></li>
							<li><Link to={properties.customers.path}>Customers</Link></li>
							<li><Link to={properties.subscriptions.path}>Subscriptions</Link></li>
							<li><Link to={properties.invoices.path}>Invoices</Link></li>
							<li><Link to={properties.payments.path}>Payments</Link></li>
							<DropdownMenu id="settings-menu" label="Settings">
								<ul class="dropdown-menu">
									<li><Link to={properties.my_company.path}>My Company</Link></li>
									<li><Link to={properties.manage_roles.path}>Manage Roles</Link></li>
								</ul>
							</DropdownMenu>
						</ul>
					</div> : null
				}
			</nav>
		);
	}
}
