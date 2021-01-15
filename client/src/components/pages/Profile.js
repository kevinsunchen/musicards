import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

class Profile extends Component {
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
        <h1>PROFILE</h1>
        <h2>Page where a user can view and update their profile information.</h2>
      </>
    );
  }
}

export default Profile;
