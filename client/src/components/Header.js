import React from 'react';
import { Link } from 'react-router-dom';
//header page
 class Header extends React.PureComponent {

  //header
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
//check if auth
    let log = authUser ? 'Course' : 'MyAuth';

    //page
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">{log}</h1>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>Welcome, {authUser.name}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }
};

export default Header