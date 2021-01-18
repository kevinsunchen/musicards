import React, { Component } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Skeleton.css";

// GOOGLE CLIENT_ID
const GOOGLE_CLIENT_ID = "734806594873-usrpgt9023lsm2qin4eip4gsful5c2h3.apps.googleusercontent.com";

class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      viewingUser: undefined,
      loggedInUser: undefined
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    console.log("Mounting -- profileId prop:", this.props.profileId, ", userId prop:", this.props.userId);
    get(`/api/user`, { userid: this.props.profileId }).then((user) => this.setState({ viewingUser: user }));
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ loggedInUser: user });
      }
    });
  }

  render() {
    console.log("userId:", this.props.userId, "loggedInUser:", this.state.loggedInUser, "viewingUser:", this.state.viewingUser)
    if (!this.state.viewingUser) {
      return <div> Loading! </div>;
    }
    return (
      <>
        {console.log("1) On a profile page, userId prop:", this.props.userId)}
        {console.log("2) On a profile page, profileId prop:", this.props.profileId)}
        <h1>PROFILE</h1>
        <h2>Page where a user can view and update their profile information.</h2>
        <p>Viewing profile of user {this.state.viewingUser.name}, who has ID {this.props.profileId}.</p>
        {(this.state.loggedInUser) ? (
          <>
          <p>Currently logged in as user {this.state.loggedInUser.name}, who has ID {this.props.userId}.</p>
          </>
        ) : (
          <p>Not logged in.</p>
        )}
        {(this.state.loggedInUser && (this.state.loggedInUser._id === this.state.viewingUser._id)) ? (
          <button onClick={this.props.handleLogout}>logout</button>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Profile;
