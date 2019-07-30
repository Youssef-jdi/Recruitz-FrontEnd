import React from 'react';
import Register from '../views/Register/Register'
import SurveyCreator from '../views/SurveyCreator/SurveyCreator';
import Survey from '../views/Survey/Survey';

const Dashboard = React.lazy(() => import('../_components/containers/DefaultLayout'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { 
    path: '/', 
    exact: true, 
    name: 'Home' 
  },
  { 
    path: '/dashboard',  
    name: 'Dashboard', 
    component: Dashboard 
  },
  { 
    path: '/dashboard/register', 
    name: 'Register', 
    component: () =><Register/>
  },
  { 
    path: '/dashboard/Quiz/Create', 
    name: 'Quiz', 
    component: () =><Survey/>
  },
  
];

export default routes;
