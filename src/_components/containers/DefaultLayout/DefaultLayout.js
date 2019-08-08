import React, { Component, Suspense } from 'react';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import {
	AppAside,
	AppFooter,
	AppHeader,
	AppSidebar,
	AppSidebarFooter,
	AppSidebarForm,
	AppSidebarHeader,
	AppSidebarMinimizer,
	AppBreadcrumb2 as AppBreadcrumb,
	AppSidebarNav2 as AppSidebarNav
} from '@coreui/react';
// sidebar nav config
import { AdminNavigation, CandidateNavigation } from '../../../_utils/_nav';
// routes config

import Register from '../../../views/Register/Register';
import SurveyCreator from '../../../views/SurveyCreator/SurveyCreator';
import ListQuiz from '../../../views/ListQuiz/ListQuiz';
import Auth from '../../../_utils/Auth';
import QuizPass from '../../../views/PassQuiz/QuizPass';
import Candidates from '../../../views/Candidates/Candidate';
import ResultQuiz from '../../../views/ResultQuiz/ResultQuiz';
import AllQuizes from '../../../views/AllQuiz/AllQuizes';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
	constructor(props) {
		super(props);
	}
	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

	signOut(e) {
		e.preventDefault();
		console.error('this.props ', this.props);
		Auth.deauthenticateUser();
		//this.props.history.push('/')
	}

	hideAppSideBarForCandidates = () => {
		return Auth.getUser().role === 'Candidate' ? null : null;
	};

	componentDidMount() {
		// this.isLoggedIn();
	}

	isLoggedIn = async () => {
		if (!Auth.isUserAuthenticated()) await this.props.history.push('/');
	};

	render() {
		let navigation;
		Auth.isUserAuthenticated()
			? Auth.getUser().role === 'Admin' || Auth.getUser().role === 'SuperAdmin'
				? (navigation = AdminNavigation)
				: (navigation = CandidateNavigation)
			: this.props.history.push('/');
		// Auth.getUser().role === 'Admin' || Auth.getUser().role === 'SuperAdmin'
		// 	? (navigation = AdminNavigation)
		// 	: (navigation = CandidateNavigation);
		return (
			<div className="app">
				<AppHeader fixed>
					<Suspense fallback={this.loading()}>
						<DefaultHeader onLogout={(e) => this.signOut(e)} />
					</Suspense>
				</AppHeader>
				<div className="app-body">
					{/** appside bar removed when user role is candidate */}
					{/* {this.hideAppSideBarForCandidates()} */}
					<AppSidebar fixed display="lg">
						<AppSidebarHeader />
						<AppSidebarForm />
						<Suspense>
							{/** here pass different nav files */}
							{console.log('here2')}
							<AppSidebarNav navConfig={navigation} {...this.props} router={router} />
						</Suspense>
						<AppSidebarFooter />
						<AppSidebarMinimizer />
					</AppSidebar>
					<main className="main">
						{/* <AppBreadcrumb appRoutes={routes} router={router} /> */}
						<Container fluid>
							<Suspense fallback={this.loading()}>
								<Switch>
									<Route path="/dashboard/register" name="Register Page" component={Register} />
									<Route
										path="/dashboard/Quiz/Create"
										name="QuizCreator Page"
										component={SurveyCreator}
									/>
									<Route
										path="/dashboard/Quiz/ListQuizes"
										name="QuizList Page"
										component={ListQuiz}
									/>
									<Route path="/dashboard/Quiz/QuizPass" name="Quiz Pass Page" component={QuizPass} />
									<Route path="/dashboard/Candidates" name="Candidates" component={Candidates} />
									<Route path="/dashboard/result" name="Result" component={ResultQuiz} />
									<Route path="/dashboard/AllQuizes" name="All Quizes" component={AllQuizes} />
								</Switch>
							</Suspense>
						</Container>
					</main>
				</div>
				<AppFooter>
					<Suspense fallback={this.loading()}>
						<DefaultFooter />
					</Suspense>
				</AppFooter>
			</div>
		);
	}
}

export default DefaultLayout;
