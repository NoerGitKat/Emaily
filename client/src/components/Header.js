import React from 'react';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends React.Component {
	renderContent() {
		const { auth } = this.props;

		switch (auth) {
			case null:
				return 'Still deciding';
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return [
					<li key="li1" style={{ padding: '0 1.5em' }}>
						Credits: {auth.credits}
					</li>,
					<li key="li2">
						<Payments {...this.props} />
					</li>,
					<li key="li3">
						<a href="/api/logout">Logout</a>
					</li>,
				];
		}
	}

	render() {
		const { auth } = this.props;
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to={auth ? '/surveys' : '/'} className="left brand-logo">
						Emaily
					</Link>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

export default Header;
