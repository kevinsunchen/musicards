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
      <div className="u-pageWrap">
        <h1 className = "u-pageTitle">login</h1>
        <h2 className = "u-pageDescription">connect your spotify to explore musicards!</h2>
        {this.props.loggedInUser ? (
            <button onClick={this.props.handleLogout}>logout</button>
          ) : (
            <button onClick={this.props.handleLogin} className = "u-refresh">spotify login</button>
        )}
      </div>
    );
  }
}

export default Login;
