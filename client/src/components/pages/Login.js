import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

class Login extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  render() {
    return (
      <div className="u-pageWrap">
        <h1 className = "u-pageTitle u-shadowPop u-shadowPopPurple u-logofont">login</h1>
        <h2 className = "u-pageDescription">connect your spotify to explore musicards!</h2>
        {this.props.loggedInUser ? (
            <button onClick={this.props.handleLogout} className = "u-refresh u-buttonHoverRise">logout</button>
          ) : (
            <button onClick={this.props.handleLogin} className = "u-refresh u-buttonHoverRise">spotify login</button>
        )}
      </div>
    );
  }
}

export default Login;
