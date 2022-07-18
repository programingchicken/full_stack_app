import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormSign from '../FormSign';


//sign up
export default class UserSignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      username,
      password,
      errors,
    } = this.state;


    //page
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <FormSign 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={name} 
                  onChange={this.change} 
                  placeholder="Name" />
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  //change vals of text input
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
      name,
      username,
      password,
    } = this.state;

    // Create user
    const user = {
      name,
      username,
      password,
    };
    console.log(user.username)


//create the user
    context.data.createUser(user)
      .then( (data) => {
        console.log(data.length);

        //set state errors
        if (data.length !== 0) {
          this.setState({ errors: data });
      }  else {
          console.log(`${user.username} is successfully signed up and authenticated!`);
          context.actions.signIn(user.username, user.password)
            .then(() => {
              this.props.history.push('/authenticated');    
            });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  
  }

  cancel = () => {
   this.props.history.push('/');
  }
}
