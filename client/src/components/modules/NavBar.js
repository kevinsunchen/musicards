import React, { Component } from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title">musicards!</div>
        <div className="NavBar-linkContainer">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
        </div>
        <div className="NavBar-linkContainer">
          {this.props.userId ? (
            <Link to={`/profile/${this.props.userId}`} className="NavBar-link">
              Profile
            </Link>
          ) : (
            <Link to={'/login'} className="NavBar-link">
              Login
            </Link>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
