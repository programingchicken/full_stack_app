import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import error from './components/error';
import Header from './components/Header';
import Public from './components/Public';
import NotFound from './components/NotFound';
import NotAuth from './components/forbidden';
import UserSignUp from './components/user/UserSignUp';
import UserSignIn from './components/user/UserSignIn';
import UserSignOut from './components/user/UserSignOut';
import Authenticated from './components/Authenticated';
import CourseDetail from './components/course/CourseDetail';
import Courses from './components/course/Courses';
import CreateCourse from './components/course/CreateCourse';
import UpdateCourse from './components/course/UpdateCourse';
import AuthenticatedCourse from './components/AuthenticatedCourse';
import withContext from './components/Context';
import PrivateRoute from './components/PrivateRoute';
// import { route } from '.../api/routes';

const CourseDetailWithContext = withContext(CourseDetail);
const CourseWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const AuthWithContextCourse = withContext(AuthenticatedCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

 const appRoutes = () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/courses" component={CourseWithContext} />
        <Route exact path="/course/:id/detail" component={CourseDetailWithContext} /> 
        <PrivateRoute exact path="/course/:id/update" component={UpdateCourseWithContext} /> 

        <PrivateRoute path="/course/create" component={CreateCourseWithContext} />
        <Route exact path="/" component={Public} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <PrivateRoute path="/authenticatedCourse" component={AuthWithContextCourse} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/course/notOwned" component={NotAuth} />
        <Route path="/error" component={error}/>
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default appRoutes;
