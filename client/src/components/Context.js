import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';
const Context = React.createContext(); 




export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');
    this.newCookie = Cookies.get('hashPass');

    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
      hashPass: this.newCookie ? this.newCookie : null,
    };
  }

  render() {
    const { authenticatedUser } = this.state;
    const {hashPass} = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      hashPass,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (username, password) => {

    console.log(password)
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          hashPass: password,
        };
      });
      const cookieOptions = {
        expires: 1 // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
      Cookies.set('hashPass', password, cookieOptions);
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
    this.setState({ hashPass: null });
    Cookies.remove('hashPass');
  }
}

  // newCourse = async (courses) => {
  //   const course = await this.data.createCourse(courses);
  //   if (course !== null) {
  //       return course;
  //   }
  // }

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}