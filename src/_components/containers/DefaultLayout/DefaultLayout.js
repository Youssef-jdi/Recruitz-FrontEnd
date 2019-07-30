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
import navigation from '../../../_utils/_nav';
// routes config

import Register from '../../../views/Register/Register';
import SurveyCreator from '../../../views/SurveyCreator/SurveyCreator';
import ListQuiz from '../../../views/ListQuiz/ListQuiz';
import Auth from '../../../_utils/Auth';
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

	signOut(e) {
		e.preventDefault();
	}

	checkUser = () => {
		// const user = Auth.getUser();
		// console.log('role ', user.role);
		// if (user.role === 'Admin') {
		// 	navigation.items[0].attributes = { disabled: true };
		// 	console.log('routes ', navigation.items[0]);
		// }
		// if(user.role === 'Candidate'){
		// 	 navigation.items[0].attributes = {disabled : true}
		// 	// navigation.items[1].children[] = {disabled : true}
		// 	// navigation.items[1].children.forEach(element => {
		// 	// 	element.attributes = {disabled : true}
		// 	// });
		// 	navigation.items[1].children[0].attributes = {disabled : true}
		// 	navigation.items[1].children[1].attributes = {disabled : true}
		// }
	}

	render() {
		return (
			<div className="app">
				{this.checkUser()}
				<AppHeader fixed>
					<Suspense fallback={this.loading()}>
						<DefaultHeader onLogout={(e) => this.signOut(e)} />
					</Suspense>
				</AppHeader>
				<div className="app-body">
					{/** appside bar removed when user role is candidate */}
					<AppSidebar fixed display="lg">
						<AppSidebarHeader />
						<AppSidebarForm />
						<Suspense>
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
