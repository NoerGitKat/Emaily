import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import styling
import './../styles/App.css';

// Import components
import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import SurveyNew from './surveys/SurveyNew';
import SurveyThanks from './surveys/SurveyThanks';
import NotFound from './NotFound';

// Import Redux action creators
import * as actions from './../actions';

class App extends React.Component {
	componentDidMount() {
		const { fetchUser } = this.props;
		fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Header header={'This is the header!'} {...this.props} />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route exact path="/surveys/new" component={() => SurveyNew} />
						<Route exact path="/api/surveys/thanks" component={SurveyThanks} />
						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => {
	const { auth } = state;
	return {
		auth,
	};
};

// Connecting Redux store state with App component
// This is the same as when there's separation of concerns with
// Container and Presentational components
export default connect(
	mapStateToProps,
	actions
)(App);
