import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Public from './components/Public';
import NotFound from './components/NotFound';
import UserSignUp from './components/user/UserSignUp';
import UserSignIn from './components/user/UserSignIn';
import UserSignOut from './components/user/UserSignOut';
import Authenticated from './components/Authenticated';
import CourseDetail from './components/course/CourseDetail';
import Course from './components/course/Courses';
import CreateCourse from './components/course/CreateCourse';
import UpdateCourse from './components/course/UpdateCourse';

import withContext from './components/Context';
import PrivateRoute from './components/PrivateRoute';
// import { route } from '.../api/routes';

const CourseDetailWithContext = withContext(CourseDetail);
const CourseWithContext = withContext(Course);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

 const appRoutes = () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        {/* <Route exact path="/course" component={CourseDetailWithContext} />
        <Route exact path="/course/:id" component={CourseWithContext} />
        <PrivateRoute path="/course/:id/update" component={UpdateCourseWithContext} /> */}
        <PrivateRoute path="/course/create" component={CreateCourseWithContext} />
        <Route exact path="/" component={Public} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default appRoutes;
