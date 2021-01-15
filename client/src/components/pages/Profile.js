import React, { Component } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Skeleton.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <>
        <h1>PROFILE</h1>
        <h2>Page where a user can view and update their profile information.</h2>
        <p>{this.state.user.name}</p>
        <p>{this.props.userId}</p>
      </>
    );
  }
}

export default Profile;
