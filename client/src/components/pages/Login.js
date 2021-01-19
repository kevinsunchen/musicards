import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

class Login extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <h1>LOGIN</h1>
        <h2>Page that displays when a user is not logged in and performs any action that requires being logged in.</h2>
        {this.props.loggedInUser ? (
            <button onClick={this.props.handleLogout}>logout</button>
          ) : (
            <button onClick={this.props.handleLogin}>spotify login</button>
        )}
      </>
    );
  }
}

export default Login;
