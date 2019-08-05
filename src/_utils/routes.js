import React from 'react';
import Register from '../views/Register/Register'
import SurveyCreator from '../views/SurveyCreator/SurveyCreator';
import Survey from '../views/Survey/Survey';
import QuizPass from '../views/PassQuiz/QuizPass';
import Candidates from '../views/Candidates/Candidate';
import ResultQuiz from '../views/ResultQuiz/ResultQuiz';
import AllQuizes from '../views/AllQuiz/AllQuizes';

const Dashboard = React.lazy(() => import('../_components/containers/DefaultLayout'));



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
  {
    path : '/dashboard/Quiz/QuizPass',
    name : 'Quiz Pass',
    component : () => <QuizPass/>,
  },
  {
    path : '/dashboard/Candidate',
    name : 'Candidate',
    component : () => <Candidates/>,
  },
  {
    path : '/dashboard/result',
    name : 'Candidate result',
    component : () => <ResultQuiz/>,
  },
  {
    path : '/dashboard/AllQuizes',
    name : 'All Quizes',
    component : () => <AllQuizes/>,
  }
  
];

export default routes;
