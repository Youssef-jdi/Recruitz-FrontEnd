import React, { Component } from 'react';
import { Route, Switch ,BrowserRouter } from 'react-router-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import history from '../src/History';
import { Provider } from 'react-redux';
import './App.scss';
import store from './store/';
import UpdatePassword from './views/UpdatePassword/UpdatePassword'
import Login from './views/Login/Login';
import DefaultLayout from './_components/containers/DefaultLayout';
import TokenNotValid from './views/UpdatePassword/TokenNotValid';
import SurveyCreator from './views/SurveyCreator/SurveyCreator';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					
						<React.Suspense fallback={loading()}>
						<BrowserRouter history={history}>
							<Switch>
								{/* <Route exact path="/dashboard/register" name="Register Page" component={Register} /> */}
								<Route path="/dashboard" name="Dashboard" render={props => <DefaultLayout {...props}/>} />
								<Route path="/updatepassword/:token" name="Update password" render={props => <UpdatePassword {...props}/>} />
								<Route path="/problem" name="Token Invalid" render={props => <TokenNotValid {...props}/>} />
								<Route exact path="/" name="Login Page" component={Login} />
							</Switch>
							</BrowserRouter>
						</React.Suspense>
					
				</MuiThemeProvider>
			</Provider>
		);
	}
}

export default App;
