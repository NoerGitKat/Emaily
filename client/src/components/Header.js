import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
	renderContent() {
		const { user } = this.props.auth;
		switch (user) {
			case null:
				return 'Still deciding';
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return (
					<li>
						<a href="/api/logout">Logout</a>
					</li>
				);
		}
	}

	render() {
		const { user } = this.props.auth;
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to={user ? '/surveys' : '/'} className="left brand-logo">
						Emaily
					</Link>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

export default Header;
