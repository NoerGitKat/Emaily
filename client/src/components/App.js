import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import components
import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import SurveyNew from './SurveyNew';
import NotFound from './NotFound';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Header header={'This is the header!'} />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/survey/new" component={SurveyNew} />
						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
